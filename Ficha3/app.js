function started(){
    console.log("Dowload Started");
}

function update(){
    for(var i = 0; i <= 100; i++){
        console.log(i + "% of Download");
    }
}

function completed(){
    console.log("Donlowad Completed!");
}

function performDownload(started, update, completed){
    started();
    update();
    completed();
}

//performDownload(started,update,completed);
var arrayUtils = require('./arrayUtils');
var array = [];
var array2 = [1,2,3,4,5,6,7,8,9];
//console.log(arrayUtils.isEmpty(array));
console.log(arrayUtils.max(array));
//console.log(arrayUtils.min(array));
//console.log(arrayUtils.average(array));
//console.log(arrayUtils.indexOf(array,1));
//console.log(arrayUtils.subArray(array,1,5));
//console.log(arrayUtils.isSameLenght(array,array2));
//console.log(arrayUtils.reverse(array));
//console.log(arrayUtils.swap(array,1,2));
//console.log(arrayUtils.reverse(array));
//console.log(arrayUtils.contains(array,10));