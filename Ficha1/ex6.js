function factorial(num){
    var retornar = num;

    for(i = num-1; i >= 1; i-- ){
        retornar = retornar * i;
    }
    console.log(retornar);
}

factorial(5);