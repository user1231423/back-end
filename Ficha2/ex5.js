function trabalho(entrada,saida){
    if (entrada < 8 || entrada > 18 || saida > 18 || saida < 8 || entrada > saida){
        return "Erro";
    }else{
        var calculo = 0;
        calculo = saida - entrada;
        return calculo;
    }
}


console.log(trabalho(9,18));