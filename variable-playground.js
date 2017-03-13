var person = {
    name: 'Boo Kian',
    age: 21
};

function updatePerson(obj) {
    obj = {
        name: 'Boo Kian',
        age: 46
    }
    debugger;
}

updatePerson(person);
console.log(person);

var grades = [83, 67];

function addGrade(grades) {
    grades.push(32);
}

addGrade(grades);
console.log(grades);