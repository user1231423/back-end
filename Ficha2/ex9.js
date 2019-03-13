function aluno(nome, nota1, nota2) {
    this.name = nome;
    this.notas = [nota1, nota2];
}

var aluno1 = new aluno("João", 20, 10); //Creating new aluno
var aluno2 = new aluno("Alberto", 2, 20); //Creating new aluno

var turma = [aluno1, aluno2]; //Creating array containing the aluno's previously created

function imprimir(turma, size) {
    for (i = 0; i < size; i++) {
        console.log(turma[i].name);
    }
}

function melhor_nota(turma, size) { //get the best grade ////////Incomplete///////
    var melhor = 0;
    var num_melhor = 0;
    var num_nota = 0;
    for (i = 0; i < size; i++) { //1st cicle to go trought the entire array turma
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


function pior_nota(turma, size) { //get the worst grade ////////Incomplete///////
    var pior = 20;
    var num_pior = 0;
    var num_nota = 0;
    for (i = 0; i < size; i++) { //1st cicle to go trought the entire array turma
        for (x = 0; x < 2; x++) {
            console.log(turma[i].notas[x])
            if (turma[i].notas[x] < pior) { // 1nd cicle to go trought the array notas
                pior = turma[i].notas[x];
                num_pior = i; //get the number of the student
                num_nota = x; //get the position of the best grade on the array
            }
        }
    }
    console.log("A pior Nota no foi de: ", turma[num_pior].name, "-> ", turma[num_pior].notas[num_nota]);
}

function operacao(opt, turma) {
    var size = turma.length;
    switch (opt) {
        case 'a':
            imprimir(turma, size);
        case 'c':
            melhor_nota(turma, size);
        case 'd':
            pior_nota(turma);
        case 'e':
            //media(turma);
        case 'f':
            //negativas(turma);
        case 'g':
            //positivas(turma);
        default:
            return "Erro";
    }
}

console.log(operacao('d', turma));