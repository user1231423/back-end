function retangulo(largura,altura){
    for (i = 0; i < altura; i++){
        var desenho = "";
        for (x = 0; x < largura; x++){
            desenho += "*";
        }
        console.log(desenho);
    }
}

retangulo(20,10);
