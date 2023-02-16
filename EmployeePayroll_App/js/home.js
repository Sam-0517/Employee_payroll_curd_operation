let empPayrollList;
window.addEventListener("DOMContentLoaded", (event) => {
    empPayrollList=getEmployeePayrollDataFromStorage();
    document.querySelector('.emp-count').textContent=empPayrollList.length;
    createInnerHtml();
});

const getEmployeePayrollDataFromStorage = () =>{
    return localStorage.getItem('EmployeePayrollList')?
    JSON.parse(localStorage.getItem('EmployeePayrollList')):[];
}

const createInnerHtml = () => {
    if(empPayrollList==0) return;
    const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th>" +
        "<th>Start Date</th><th>Actions</th></tr>"
   
    
    let innerHtml = `${headerHtml}`;
    for(const empPayrollData of empPayrollList){
        innerHtml=`${innerHtml}
            <tr>
                <td><img class="profile" src="${empPayrollData._profilePic}" alt=""></td>
                <td>${empPayrollData._name}</td>
                <td>${empPayrollData._gender}</td>
                <td>${getDeptHtml(empPayrollData._department)}</td>
                <td>${empPayrollData._salary}</td>
                <td>${stringifyDate(empPayrollData._startDate)}</td>
                <td>
                    <img id="${empPayrollData._id}" onclick="remove(this)" src="/assets/icons/icons8-delete.svg" alt="delete">
                    <img id="${empPayrollData._id}" onclick="update(this)" src="/assets/icons/edit.svg" alt="edit">
                </td>
            </tr>

    `;
    }
    
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) =>{
    let deptHtml = '';
    for(const dept of deptList){
        deptHtml=`${deptHtml}<div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}

const remove = (node) =>{
    let empPayrollData = empPayrollList.find(empData=>empData._id==node.id)
    if(!empPayrollData) return;
    const index = empPayrollList
                                .map(empData=>empData._id)
                                .indexOf(empPayrollData._id);
    empPayrollList.splice(index,1);
    localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
    document.querySelector('.emp-count').textContent=empPayrollList.length;
    createInnerHtml();
}