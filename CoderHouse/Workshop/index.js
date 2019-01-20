class Student{
	constructor(firstName, lastName, dni, email){
		this.firstName = firstName
		this.lastName = lastName
		this.dni = dni
		this.email = email
	}

	fullName() {
		return this.firstName + ' ' + this.lastName
	}
}	
isDataAtLocalStorage()


var fName = [];
var lName = [];
var dni_ = [];
var email_ = [];
var search = [];
var delete_ = [];
var student = []
var newStudent = [];
var studentLengthKey = 0;
var studentLength = 1; 
var localLength;

function isDataAtLocalStorage(){
	if(!localStorage.getItem("STUDENTS")){
		localStorage.setItem('STUDENTS', JSON.stringify([]))
	}

	showStudents()
	getInputValue()
}





function getInputValue(){
	document.getElementById('firstName').onblur = function() {
		fName = this.value
	};
	
	document.getElementById('lastName').onblur = function() {
		lName = this.value
	}

	document.getElementById('dni').onblur = function() {
		dni_ = this.value
	}
	document.getElementById('email').onblur = function() {
		email_ = this.value
	}
	document.getElementById('searchText').onblur = function() {
		search = this.value
	}

	document.getElementById('deleteDni').onblur = function() {
		delete_ = this.value
	}
	
}

function validateInput(f_name, l_name, dni__, email__){
	var students = JSON.parse(localStorage.getItem('STUDENTS'))
	var isValid;
	var data = []
	data.push(f_name, l_name, dni__, email__)
	function validateDni(){
		var noExist = true
		students.forEach(student_ => {
			if(student_.dni === dni__){
				noExist = false
			}else{
				noExist = true
			}
		})
		return noExist
	}


	if((data[0] && isNaN(data[0])) &&
		(data[1] && isNaN(data[1])) && 
		(data[2] && !isNaN(data[2])) && 
		(data[2] > 0) && (data[2].length > 7) &&
		(validateDni()) && 
		(data[3] && data[3].indexOf('@') > 0) && 
		(data[2].length > 4) &&
		(data[3].indexOf('.') > 0)){
		isValid = true;
		//
	}else{
		isValid = false;
	}
	return isValid
}
function saveStudents(){
	var students = JSON.parse(localStorage.getItem('STUDENTS'))
	if(validateInput(fName, lName, dni_, email_)){
		var student = new Student(fName, lName, dni_, email_)
		students.push(student)
		addStudent(student, 'mainList')
		localStorage.setItem('STUDENTS', JSON.stringify(students))
		document.getElementById('firstName').className = 'form-control is-valid'
		document.getElementById('lastName').className = 'form-control is-valid'
		document.getElementById('dni').className = 'form-control is-valid'
		document.getElementById('email').className = 'form-control is-valid'
		
	}else {
		document.getElementById('firstName').className = 'form-control is-invalid'
		document.getElementById('lastName').className = 'form-control is-invalid'
		document.getElementById('dni').className = 'form-control is-invalid'
		document.getElementById('email').className = 'form-control is-invalid'
	}	
}
	


function showStudents() {
	var ulStudents = document.getElementById('mainList')
	JSON.parse(localStorage.getItem('STUDENTS')).forEach(student => {
		addStudent(new Student(student.firstName, student.lastName, student.dni, student.email), 'mainList')
	})
			firstName.value = '';
			lastName.value = '';
			dni.value = '';
			email.value = '';

}

function addStudent(student, element){
	var ulStudents = document.getElementById(element)
	var liStudent = document.createElement('li')
	liStudent.innerHTML = `<h2>${student.fullName()}</h2> <p>${student.dni +' <br> '+ student.email}</p>`;
	liStudent.id = student.dni
	ulStudents.appendChild(liStudent)
	
}



function searchStudent(){
	getInputValue()
	
	var students = JSON.parse(localStorage.getItem('STUDENTS'))
	students.forEach(student => {
		debugger;
		if(search.toLowerCase() == student.firstName.toLowerCase() || search.toLowerCase() == student.lastName.toLowerCase()){
		addStudent(new Student(student.firstName, student.lastName, student.dni, student.email), 'searchList')
		
	}
	})
	
	 
}

function removeItem(){
	getInputValue()
	
	var students = JSON.parse(localStorage.getItem('STUDENTS'))
	var newStudentsArray = students.filter(students => students.dni !==  delete_)
	var studentsToLocalStorage = JSON.stringify(newStudentsArray)

	JSON.stringify(localStorage.setItem('STUDENTS', studentsToLocalStorage))
	students.forEach(student => {
		if(student.dni == delete_){
			document.getElementById(student.dni).remove()
		}
		
	})
	
}



