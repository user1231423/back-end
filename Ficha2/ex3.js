function vogal(frase) {
    var size = frase.length;
    var soma = 0;
    for (i = 0; i<size; i++){
        if (frase[i] == 'a' || frase[i] == 'e' || frase[i] == 'i' || frase[i] == 'o' || frase[i] == 'u' ){
            soma += 1;
        }
    }
    return soma;
}

console.log(vogal("Quantas vogais?"));