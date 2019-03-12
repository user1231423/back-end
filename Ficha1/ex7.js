//Find biggest number
function max(numeros,size){
    var maior = numeros[0];//Set 1st number as the biggest in order to compare later
    for(i = 0; i<size; i++ ){
        if (numeros[i] > maior){
            maior = numeros[i];//If number > maior set maior equal to number
        }
    }
    console.log("Maior Número: " + maior);
}

//Find Smallest number
function menor(numeros,size){
    var menor = numeros[0]; //Set 1st as the smallest
    for (i = 0; i<size; i++){
        if (numeros[i] < menor){
            menor = numeros[i];//If numer < menor set menor equal to  number
        }
    }
    console.log("Menor Número: " + menor);
}

//Find Average between all the numbers in the array
function media(numeros,size){
    var soma = 0;
    for (i = 0; i<size; i++){
        soma = soma + numeros[i];//Sum all the numbers inside the array
    }
    console.log("Média: " + soma/size);//Average = Sum off all the numbers dividing by the size of the array
}

var num = [1,2,3,4,5,6,7,8,9,10];
var lenght = num.length;
max(num,lenght);
menor(num,lenght);
media(num,lenght);
