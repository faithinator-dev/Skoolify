$registerContent = @'
$kind: http-request
name: Register
method: POST
url: '{{baseUrl}}/api/auth/register'
description: 'Register a new user. Roles: admin, teacher, student.'
order: 1000
headers:
  - key: Content-Type
    value: application/json
body:
  type: json
  content: |-
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123",
      "role": "admin",
      "schoolName": "Greenwood High"
    }
events:
  - listen: test
    script:
      type: text/javascript
      exec: |-
        // ── Status code ──────────────────────────────────────────────
        pm.test('Status code is 201 Created', function () {
            pm.response.to.have.status(201);
        });

        // ── Response time ─────────────────────────────────────────────
        pm.test('Response time is under 2000ms', function () {
            pm.expect(pm.response.responseTime).to.be.below(2000);
        });

        // ── Content-Type ──────────────────────────────────────────────
        pm.test('Response is JSON', function () {
            pm.response.to.have.header('Content-Type');
            pm.expect(pm.response.headers.get('Content-Type')).to.include('application/json');
        });

        // ── Response body structure ───────────────────────────────────
        const jsonData = pm.response.json();

        pm.test('Response contains a token', function () {
            pm.expect(jsonData).to.have.property('token');
            pm.expect(jsonData.token).to.be.a('string').and.not.empty;
        });

        pm.test('Response contains a user object', function () {
            pm.expect(jsonData).to.have.property('user');
            pm.expect(jsonData.user).to.be.an('object');
        });

        pm.test('User object has expected fields', function () {
            const user = jsonData.user;
            pm.expect(user).to.have.property('id');
            pm.expect(user).to.have.property('name');
            pm.expect(user).to.have.property('email');
            pm.expect(user).to.have.property('role');
        });

        pm.test('Returned email matches the registered email', function () {
            const requestBody = JSON.parse(pm.request.body.raw);
            pm.expect(jsonData.user.email).to.eql(requestBody.email);
        });

        pm.test('Returned role matches the registered role', function () {
            const requestBody = JSON.parse(pm.request.body.raw);
            pm.expect(jsonData.user.role).to.eql(requestBody.role);
        });

        pm.test('Password is not exposed in the response', function () {
            pm.expect(jsonData.user).to.not.have.property('password');
        });
'@

$loginContent = @'
$kind: http-request
name: Login
method: POST
url: '{{baseUrl}}/api/auth/login'
description: 'Login and receive a JWT token.'
order: 2000
headers:
  - key: Content-Type
    value: application/json
body:
  type: json
  content: |-
    {
      "email": "john@example.com",
      "password": "password123"
    }
events:
  - listen: test
    script:
      type: text/javascript
      exec: |-
        // ── Status code ──────────────────────────────────────────────
        pm.test('Status code is 200 OK', function () {
            pm.response.to.have.status(200);
        });

        // ── Response time ─────────────────────────────────────────────
        pm.test('Response time is under 2000ms', function () {
            pm.expect(pm.response.responseTime).to.be.below(2000);
        });

        // ── Content-Type ──────────────────────────────────────────────
        pm.test('Response is JSON', function () {
            pm.response.to.have.header('Content-Type');
            pm.expect(pm.response.headers.get('Content-Type')).to.include('application/json');
        });

        // ── Response body structure ───────────────────────────────────
        const jsonData = pm.response.json();

        pm.test('Response contains a token', function () {
            pm.expect(jsonData).to.have.property('token');
            pm.expect(jsonData.token).to.be.a('string').and.not.empty;
        });

        pm.test('Token is a valid JWT format (3 dot-separated parts)', function () {
            const parts = jsonData.token.split('.');
            pm.expect(parts).to.have.lengthOf(3);
        });

        pm.test('Response contains a user object', function () {
            pm.expect(jsonData).to.have.property('user');
            pm.expect(jsonData.user).to.be.an('object');
        });

        pm.test('User object has expected fields', function () {
            const user = jsonData.user;
            pm.expect(user).to.have.property('id');
            pm.expect(user).to.have.property('name');
            pm.expect(user).to.have.property('email');
            pm.expect(user).to.have.property('role');
        });

        pm.test('Returned email matches the login email', function () {
            const requestBody = JSON.parse(pm.request.body.raw);
            pm.expect(jsonData.user.email).to.eql(requestBody.email);
        });

        pm.test('Password is not exposed in the response', function () {
            pm.expect(jsonData.user).to.not.have.property('password');
        });

        // ── Save token to environment ─────────────────────────────────
        if (jsonData.token) {
            pm.environment.set('token', jsonData.token);
            console.log('JWT token saved to environment variable: token');
        }

        if (jsonData.user && jsonData.user.id) {
            pm.environment.set('userId', jsonData.user.id);
            console.log('User ID saved to environment variable: userId');
        }
'@

[System.IO.File]::WriteAllText("$PSScriptRoot\postman\collections\Skoolify API\Auth\Register.request.yaml", $registerContent, [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText("$PSScriptRoot\postman\collections\Skoolify API\Auth\Login.request.yaml", $loginContent, [System.Text.Encoding]::UTF8)
Write-Host "Both files written successfully."
