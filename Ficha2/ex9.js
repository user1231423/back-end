function aluno(nome, nota1, nota2) {
    this.name = nome;
    this.notas = [nota1, nota2];
}

var aluno1 = new aluno("João", 20, 10); //Creating new aluno
var aluno2 = new aluno("Alberto", 2, 11); //Creating new aluno

var turma = [aluno1, aluno2]; //Creating array containing the aluno's previously created

function imprimir(turma) {
    for (i = 0; i < turma.length; i++) {
        console.log(turma[i].name);
    }
}

function melhor_nota(turma) { //get the best grade ////////Incomplete///////
    var melhor = 0;
    var num_melhor = 0;
    var num_nota = 0;
    for (i = 0; i < turma.length; i++) { //1st cicle to go trought the entire array turma
        for (x = 0; x < 2; x++) {
            if (turma[i].notas[x] > melhor) { // 1nd cicle to go trought the array notas
                melhor = turma[i].notas[x];
                num_melhor = i; //get the number of the student
                num_nota = x; //get the position of the best grade on the array
            }
        }
    }
    console.log("A melhor Nota no foi de: ", turma[num_melhor].name, "-> ", turma[num_melhor].notas[num_nota]);
}


function pior_nota(turma) { //get the worst grade ////////Incomplete///////
    var pior = 20;
    var num_pior = 0;
    var num_nota = 0;
    for (i = 0; i < turma.length; i++) { //1st cicle to go trought the entire array turma
        for (x = 0; x < 2; x++) {
            if (turma[i].notas[x] < pior) { // 1nd cicle to go trought the array notas
                pior = turma[i].notas[x];
                num_pior = i; //get the number of the student
                num_nota = x; //get the position of the best grade on the array
            }
        }
    }
    console.log("A pior Nota no foi de: ", turma[num_pior].name, "-> ", turma[num_pior].notas[num_nota]);
}



////////////// Get the average and then the closest grade to the average ////////////////
/// Work on progress//////
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
            var closest = Math.abs(media - turma[i].notas[x]); //// Still working on it
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
    switch (opt) {
        case 'a':
            imprimir(turma);
        case 'c':
            melhor_nota(turma);
        case 'd':
            pior_nota(turma);
        case 'e':
            media(turma);
        case 'f':
            negativas(turma);
        case 'g':
            positivas(turma);
        default:
            return "Erro";
    }
}

console.log(operacao('a', turma));