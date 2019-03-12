function desenho(lado){
    var cheio = "";
    for (c = 0; c < lado; c++){
        cheio += "*";
    }
    console.log(cheio);
    var desenho = "";
    for (x = 0; x < lado-2; x++){
        if (x == 1 || x == lado-2){
            desenho += "*";
        }else if(x > 1 && x < lado-2){
            desenho += " ";
        }
        console.log(desenho);
    }
    console.log(cheio);
}


desenho(10);