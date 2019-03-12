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