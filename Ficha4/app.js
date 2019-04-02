var pessoa = {
    name: '',
    age: null,
    gender: ''
}
var john = Object.create(pessoa);
john.name = 'John';
john.age = 20;
john.gender = 'M';

console.log(JSON.stringify(pessoa));

var obj = JSON.parse(
    '{"name":"Jane","age":30,"gender":"F"}'
);

console.log(obj.name);