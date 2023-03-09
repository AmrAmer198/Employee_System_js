let addButton = document.getElementById('add');
let nameInput = document.getElementById('name');
let ageInput = document.getElementById('age');
let salaryInput = document.getElementById('salary');
let phoneInput = document.getElementById('phone');
let inputs = document.getElementsByClassName('form-control')
let searchtxt = document.getElementById('searchId')
let currentIndex;
employees = []

let test = JSON.parse(localStorage.getItem("employeList"))

let draw = ()=>{
    let trs='';
    for(let i=0 ; i<employees.length;i++){
       trs+= `
       <tr>
       <td>${employees[i].empName}</td>
       <td>${employees[i].empage}</td>
       <td>${employees[i].empsalary}</td>
       <td>${employees[i].empphone}</td>
       <td><button onclick='getEmpData(${i})' class="btn btn-warning">Update</button></td>
       <td><button onclick='deleteEmployee(${i})' class="btn btn-danger">Delete</button></td>
       </tr>
       `
    }
       document.getElementById('tableBody').innerHTML = trs
}

function getEmpData(index){

   var currentEmployee = employees[index];
    nameInput.value =  currentEmployee.empName ;
    ageInput.value = currentEmployee.empage;
    salaryInput.value = currentEmployee.empsalary;
    phoneInput.value = currentEmployee.empphone;
    addButton.innerHTML="Update Employee"
    currentIndex = index;
    
    
}

addButton.onclick = function(){
    
    if(addButton.innerHTML == "Add Employee"){
        addButton();
}
else{
    updateEmployee();
}
    draw();
}

function updateEmployee(){
    

   var  Employee = {
        "empName":nameInput.value,
        "empage":ageInput.value,
        "empsalary":salaryInput.value,
        "empphone":phoneInput.value,
    }
    employees[currentIndex] = Employee
}

if(localStorage.getItem("employeList")==null){
employees=[];
}
else{
   
employees=JSON.parse(localStorage.getItem("employeList"))
draw();
}




let resetForm = ()=>{
   for(let i=0 ; i<inputs.length ; i++){
    inputs[i].value = '';
   }
    
}


addButton.addEventListener('click',()=>{

Employee = {
    empName:nameInput.value,
    empage:ageInput.value,
    empsalary:salaryInput.value,
    empphone:phoneInput.value,
}
employees.push(Employee);
localStorage.setItem("employeList",JSON.stringify(employees));
 draw();
 resetForm();
})



function deleteEmployee(index){
    employees.splice(index,1)
    localStorage.setItem("employeList",JSON.stringify(employees));
 
    draw();
}

searchtxt.addEventListener('keyup' , e =>{
    let currentValue = e.target.value.toLowerCase();
    let trs = '';
    for(let i=0 ; i<employees.length;i++){

        if(employees[i].empName.toLowerCase().includes(currentValue.toLowerCase())){
        trs+= `
        <tr>
        <td>${employees[i].empName}</td>
        <td>${employees[i].empage}</td>
        <td>${employees[i].empsalary}</td>
        <td>${employees[i].empphone}</td>
        <td><button onclick='updateEmployee(${i})' class="btn btn-warning">Update</button></td>
        <td><button onclick='deleteEmployee(${i})' class="btn btn-danger">Delete</button></td>
        </tr>
        `
     
       
    }
  }
  document.getElementById('tableBody').innerHTML = trs;
  
})

//validation  example on Name 
nameInput.onkeyup = function () {
    var nameRejex = /^[A-Z][a-z]{2,7}/

  if(!nameRejex.test(nameInput.value)) {
    addButton.disabled ="true"
    return false;
  }
  else {
    addButton.removeAttribute('disabled')
    return true
  }
  }