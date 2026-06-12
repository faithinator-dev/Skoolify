// Student management logic
async function fetchAndRenderStudents() {
    const response = await apiRequest('/students');
    const tableBody = document.getElementById('studentTableBody');
    
    if (!tableBody) return;

    if (response.success === false) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: red;">${response.message}</td></tr>`;
        return;
    }

    const students = response; // Assuming backend returns array or direct data

    tableBody.innerHTML = students.map(student => `
        <tr>
            <td style="font-weight: 500;">${student.firstName} ${student.lastName}</td>
            <td style="color: var(--text-muted);">${student.admissionNumber || 'N/A'}</td>
            <td>${student.className}</td>
            <td>${student.gender}</td>
            <td>
                ${student.subjects && student.subjects.length > 0 
                    ? student.subjects.map(s => `<span class="badge badge-primary" style="margin-right: 6px;">${s.name}</span>`).join('')
                    : '<span style="color: var(--text-muted); font-size: 0.9rem; font-style: italic;">No subjects assigned</span>'
                }
            </td>
            <td style="text-align: right;">
                <button class="btn btn-outline" style="padding: 8px 12px; font-size: 0.9rem; margin-right: 8px;">
                    <i class="fa-solid fa-pen"></i> Edit
                </button>
                <button class="btn btn-outline" style="padding: 8px 12px; font-size: 0.9rem; color: var(--danger); border-color: #FECACA;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

document.addEventListener('DOMContentLoaded', fetchAndRenderStudents);
