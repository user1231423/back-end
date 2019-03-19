function aluno(nome, nota1, nota2) {
    this.name = nome;
    this.notas = [nota1, nota2];
}

var aluno1 = new aluno("João", 20, 10); //Creating new aluno
var aluno2 = new aluno("Alberto", 2, 10); //Creating new aluno

var turma = [aluno1, aluno2]; //Creating array containing the aluno's previously created

function imprimir(turma) {
    for (i = 0; i < turma.length; i++) {
        console.log(turma[i].name);
    }
}

function melhor_nota(turma) { //get the best grade
    var melhor = 0;
    var num_melhor = [];
    var num_nota = [];
    for (i = 0; i < turma.length; i++) { //1st cicle to go trought the entire array turma
        for (x = 0; x < 2; x++) {
            if (turma[i].notas[x] >= melhor) { // 1nd cicle to go trought the array notas
                melhor = turma[i].notas[x];
                num_melhor.push(i); //get the number of the student
                num_nota.push(x); //get the position of the best grade on the array
            }
        }
    }
    if (num_melhor.length > 1){
        console.log("Melhores Notas:");
        for (i = 0; i < num_melhor.length; i++){
            console.log(turma[num_melhor[i]].name, "-> ", turma[num_melhor[i]].notas[num_nota[i]]);
        }
    }else{
        console.log("Melhor Nota:");
        console.log(turma[num_melhor[0]].name, "-> ", turma[num_melhor[0]].notas[num_nota]);
    }
}

function pior_nota(turma) { //get the worst grade
    var pior = 9.4;
    var num_pior = [];
    var num_nota = [];
    for (i = 0; i < turma.length; i++) { //1st cicle to go trought the entire array turma
        for (x = 0; x < 2; x++) {
            if (turma[i].notas[x] < pior) { // 1nd cicle to go trought the array notas
                pior = turma[i].notas[x];
                num_pior.push(i); //get the number of the student
                num_nota.push(x); //get the position of the best grade on the array
            }
        }
    }
    if (num_pior.length > 1){
        console.log("Piores notas:");
        for (i = 0; i < num_pior.length; i++){
            console.log(turma[num_pior[i]].name, "-> ", turma[num_pior[i]].notas[num_nota[i]]);
        }
    }else{
        console.log("A pior Nota no foi de: ", turma[num_pior[0]].name, "-> ", turma[num_pior[0]].notas[num_nota[0]]);
    }
}

////////////// Get the average and then the closest grade to the average ////////////////
function media(turma){
    var soma = 0;
    var quantas_foram = 0;
    for (i = 0; i < turma.length; i++){
        for (x = 0; x < 2; x++){
            soma += turma[i].notas[x];
            quantas_foram += 1;
        }
    }
    var media = soma/quantas_foram /// Get the average value
    var devolve = 0;
    var diff = 21; /// set the min  difference
    for (i = 0; i < turma.length; i++){
        for (x = 0; x < 2; x++){
            var closest = Math.abs(media - turma[i].notas[x]);
            if (closest < diff){
                diff = closest; //// if closest value < difference devolve gets the value of the current grade
                devolve = turma[i].notas[x];
            }
        }
    }
    console.log("A média é: ", media);
    console.log("A nota mais proxima é: ", devolve);
}

/// Negative grades only/////
function negativas(turma) {
    var negativas = [];
    for (i = 0; i < turma.length; i++){
        for (x = 0; x < turma.length; x++){
            if (turma[i].notas[x] < 9.5){
                negativas.push(turma[i].notas[x]);
                console.log(turma[i].name, "Obteve: ",turma[i].notas[x]);
            }
        }
    }
    return negativas;
}

///// Numero de positivas ///////
function positivas(turma) {
    var positivas = [];
    for (i = 0; i < turma.length; i++){
        for (x = 0; x < turma.length; x++){
            if (turma[i].notas[x] >= 9.5){
                positivas.push(turma[i].notas[x]);
                console.log(turma[i].name, "Obteve: ",turma[i].notas[x]);
            }
        }
    }
    return positivas;
}

function operacao(opt, turma) {
    if (opt == 'a'){
        imprimir(turma);

    }else if (opt == 'b') {
        melhor_nota(turma);

    }else if(opt == 'c') {
        pior_nota(turma);

    }else if(opt == 'd'){
        media(turma);

    }else if(opt == 'e') {
        media(turma);

    }else if(opt == 'f'){
        negativas(turma);

    }else if(opt == 'g'){
        positivas(turma);
    }else{
        return "Erro";
    }
}

console.log(operacao('c', turma));