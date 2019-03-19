function trabalho(entrada,saida){
    var horas_entrada = entrada.split(':');
    var horas_saida = saida.split(':');

    var enter = new Date();
    enter.setHours(horas_entrada[0]);
    enter.setMinutes(horas_entrada[1]);
    enter.setSeconds(horas_entrada[2]);

    var exit = new Date();
    exit.setHours(horas_saida[0]);
    exit.setMinutes(horas_saida[1]);
    exit.setSeconds(horas_saida[2]);

    var retornar = new Date();
    var horas_trabalhadas = exit.getHours() - enter.getHours();
    retornar.setHours(horas_trabalhadas);

    var minutosTrabalho = exit.getMinutes() + enter.getMinutes();
    if (minutosTrabalho <= 59){
        retornar.setMinutes(minutosTrabalho);
    }else if (minutosTrabalho == 60){
        retornar.setHours(horas_trabalhadas + 1);
    }else{
        var min = minutosTrabalho / 60;
        var string_min = min.toString();
        var string_min_splited = string_min.split('.');
        console.log(string_min_splited);
        retornar.setHours(retornar.getHours() + 1);

    }

}


trabalho('9:45:00','18:45:00');