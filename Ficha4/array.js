var array = [];

array.push(
    function(){
        return "Hello ";
    },
    function(){
        return "World ";
    },
    function(){
        return "1,2,3";
    }
)
console.log(array);

mensagem = "";
for(var i = 0; i < array.length; i++){
    mensagem += array[i]();
}
console.log(mensagem);

msg = "";
array.forEach(function(element) {
    msg += element();
});

console.log(msg);