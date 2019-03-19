function reverse(palavra) {
    var splited = palavra.split(" ");
    var reversed = " ";
    for (var i = 0; i < splited.length; i++ ){
        var size  = splited[i].length;
        for (x = size-1; x >= 0; x--){
            reversed += splited[i][x];
        }
        reversed += " ";
    }
    return reversed;
}

console.log(reverse("Imprime ao contrario"));