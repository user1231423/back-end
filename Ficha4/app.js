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

var Emitter = require('./emitter');
var ocorrencias = require('./config');

console.log(ocorrencias.eventos.PRIMEIRO)

var test = new Emitter();

console.log(test);

test.on(ocorrencias.eventos.PRIMEIRO,function(){
    console.log("Retornar");
});

test.on(ocorrencias.eventos.SEGUNDO,function(){
    console.log("Não retornar");
});

test.emit(ocorrencias.eventos.PRIMEIRO);
test.emit(ocorrencias.eventos.SEGUNDO);