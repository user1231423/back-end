function reverse(palavra) {
    var size  = palavra.length;
    var reversed = " ";
    for (var i = size-1; i >= 0; i-- ){
        reversed += palavra[i];
    }
    return reversed;
}

console.log(reverse("Imprime ao contrario"));