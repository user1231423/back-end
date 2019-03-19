function trabalho(entrada, saida) {
    var horaInicio = entrada.split(":"); //Split starting hours
    var horaSaida = saida.split(":"); //Split finishing hours

    //Create 2 variables to set as the starting hour and ending
    hora1 = new Date();
    hora2 = new Date();

    //Filling the variables with data from the splited string
    hora1.setHours(horaInicio[0], horaInicio[1], horaInicio[2]); //Starting hour
    hora2.setHours(horaSaida[0], horaSaida[1], horaSaida[2]); //Ending hour

    ///Still working on this condition -------------- working hours only between 8:00:00 and 18:00:00
    if (hora1.getHours() < 8 || hora1.getHours() > 18 || hora2.getHours() > 18 || hora1.getHours() < 8 || hora1.getHours() > hora2.getHours()) {
        console.log("Erro");
    } else {
        var difference = new Date(); //New variable this will be the hours difference or the hours worked

        //difference equals to ending hours - starting hours at the end we get the amout of time worked
        difference.setHours(hora2.getHours() - hora1.getHours(), hora2.getMinutes() - hora1.getMinutes(), hora2.getSeconds() - hora1.getSeconds());
        console.log(difference.getHours(), ':', difference.getMinutes(), ':', difference.getSeconds());
    }
}

trabalho('8:01:10', '17:59:20');