function Person(firstName,lastName) {
    this.firstName = firstName,
    this.lastName = lastName
}

Person.prototype.age = 0;

Person.prototype.greet = function (){
    if (this.age != 0){
        return "Hello " + this.firstName + " " + this.lastName + " you are: " + this.age + " years old!";
    } else{
        return "Hello " + this.firstName + " " + this.lastName;
    }   
}

var john = new Person("John","Doe");
console.log(john.__proto__);

console.log(john.greet());

var jane = new Person("Jane","Doe");
jane.age = 51;
console.log(jane.age);