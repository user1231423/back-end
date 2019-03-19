/////////////// EX1 /////////////////////
function imc(peso,altura) {
    var massa = peso/Math.pow(altura,2);
    if (massa < 18.5){
        console.log("Abaixo do peso-> ", massa);
    }else if(massa > 18.5 && massa < 25){
        console.log("No peso normal-> ", massa);
    }else if(massa > 25 && massa < 30){
        console.log("Acima do peso-> ", massa);
    }else{
        console.log("Obeso-> ", massa);
    }
}
imc(70,1.75);
/////////////// EX1--- FIM!!!!! /////////////////////

/////////////// EX2 /////////////////////
function reverse(palavra) {
    var size  = palavra.length;
    var reversed = "";
    for (var i = size-1; i >= 0; i-- ){
        reversed += palavra[i];
    }
    return reversed;
}

console.log(reverse("Imprime ao contrario"));
/////////////// EX2--- FIM!!!!! /////////////////////

/////////////// EX3 /////////////////////
function vogal(frase) {
    var size = frase.length;
    var soma = 0;
    for (i = 0; i<size; i++){
        if (frase[i] == 'a' || frase[i] == 'e' || frase[i] == 'i' || frase[i] == 'o' || frase[i] == 'u' ){
            soma += 1;
        }
    }
    return soma;
}

console.log(vogal("Quantas vogais?"));
/////////////// EX3--- FIM!!!!! /////////////////////

/////////////// EX4 /////////////////////
function saber(frase,letra){
    var size = frase.length;
    var soma = 0;
    for (i = 0; i < size; i++){
        if(frase[i] == letra){
            soma += 1;
        }
    }
    return soma;
}

console.log(saber("Quantas vezes repete?", "e"));
/////////////// EX4--- FIM!!!!! /////////////////////

/////////////// EX5 /////////////////////
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
/////////////// EX5--- FIM!!!!! /////////////////////

/////////////// EX6 /////////////////////
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
/////////////// EX6--- FIM!!!!! /////////////////////

/////////////// EX7 /////////////////////
function triangulo(altura){
    var desenho = "";
    for (i = 0; i < altura; i++){
        desenho += "*";
        console.log(desenho);
    }
}

triangulo(10);
/////////////// EX7--- FIM!!!!! /////////////////////

/////////////// EX8 /////////////////////
function desenho(lado) {
    var full = "";
    for (i = 0; i < lado; i++) {
        full += "*";
    }
    console.log(full);
    for (c = 0; c < lado; c++) {
        var mid_empty = "*";
        for (x = 0; x < lado - 2; x++) {
            mid_empty += " ";
            if (x == lado - 3) {
                mid_empty += "*";
            }
        }
        console.log(mid_empty);
    }
    console.log(full);
}
desenho(10);
/////////////// EX8--- FIM!!!!! /////////////////////

/////////////// EX9 /////////////////////
function aluno(nome, nota1, nota2) {
    this.name = nome;
    this.notas = [nota1, nota2];
}

var aluno1 = new aluno("João", 20, 20); //Creating new aluno
var aluno2 = new aluno("Alberto", 2, 20); //Creating new aluno

var turma = [aluno1, aluno2]; //Creating array containing the aluno's previously created

function imprimir(turma) {
    for (i = 0; i < turma.length; i++) {
        console.log(turma[i].name);
    }
}

function melhor_nota(turma) { //get the best grade
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


function pior_nota(turma) { //get the worst grade
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

console.log(operacao('b', turma));
/////////////// EX9--- FIM!!!!! /////////////////////