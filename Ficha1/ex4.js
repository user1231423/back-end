function multiplos(num){
    var multiplo = 1;
    var i = 1;
    while (multiplo < 20){
        multiplo = num * i
        if (multiplo == 20){
            break;
        }
        i = i + 1;
        console.log(multiplo);
    }
}

multiplos(5);