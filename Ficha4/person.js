function Person(firstName,lastName) {
    this.firstName = firstName,
    this.lastName = lastName,
    this.greet = function(){
        if (this.age != 0){
            return "Hello " + this.firstName + " " + this.lastName + " you are: " + this.age + " years old!";
        } else{
            return "Hello " + this.firstName + " " + this.lastName;
        }   
    }
}

Person.prototype.age = 0;

var john = new Person("John","Doe");
console.log(john.__proto__);

console.log(john.age);

var jane = new Person("Jane","Doe");
