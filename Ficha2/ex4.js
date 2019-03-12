function saber(frase,letra){
    var size = frase.length;
    var soma = 0;
    for (i = 0; i < size; i++){
        if(frase[i] == letra){
            soma += 1;
        }
    }
    return soma;
}

console.log(saber("Quantas vezes repete?", "e"));