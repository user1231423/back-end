var arrayFunctions = {
    isEmpty: function (array) {
        if (array.length > 0) { // If lengh > 0 it means the array is not empty
            return false;
        } else {
            return true;
        }
    },
    max: function (array) {
        if (this.isEmpty(array)) {
            return "ERRO!";
        } else {
            var maximo = array[0]; //Set 1st value as maximo
            for (var i = 0; i < array.length; i++) { //Go through the entire array to find if there is numbers > than maximo
                if (array[i] > maximo) {
                    maximo = array[i];
                }
            }
            return maximo;
        }
    },
    min: function (array) {
        if (this.isEmpty(array)) {
            return "ERRO!";
        } else {
            var minimo = array[0];//Set 1st value as minimo
            for (var i = 0; i < array.length; i++) {//Go through the entire array to find if there is numbres < than minimo
                if (array[i] < minimo) {
                    minimo = array[i];
                }
            }
            return minimo;
        }
    },
    average: function (array) {
        if (this.isEmpty(array)) {
            return "ERRO!";
        } else {
            var soma = 0; //Set soma to 0
            for (var i = 0; i < array.length; i++) { //Go throught the entire array and sum all the values
                soma += array[i];
            }
            return soma / array.length; //Average = SUM OF ALL / TOTAL OF NUMBERS ADDED
        }
    },
    indexOf: function (array, value) {
        if (this.isEmpty(array)) {
            return "ERRO!";
        } else {
            var index = -1;
            for(var i = 0; i < array.length; i++){
                if(array[i] == value){
                    index = i;
                }
            }
            return index;
        }
    },
    subArray: function (array, startIndex, endIndex) {
        if (this.isEmpty(array)) {
            return "ERRO!";
        } else {
            var sub_array = [];//Set sub_array to an empty array
            for (var i = startIndex; i <= endIndex; i++) {//Start the for in the start index and end it on the end index
                sub_array.push(array[i]);//Add all the values between start and end to the sub_array
            }
            return sub_array;
        }
    },
    isSameLenght: function (array1, array2) {
        if (this.isEmpty(array)) {
            return "ERRO!";
        } else {
            if (array1.length == array2.length) {//Just check if sizes match or not
                return true;
            } else {
                return false;
            }
        }
    },
    reverse: function (array) {
        if (this.isEmpty(array)) {
            return "ERRO!";
        } else {
            var reverseArray = [];
            for (var i = array.length - 1; i >= 0; i--) {//Start going throught the array from the last position ultil the first
                reverseArray.push(array[i]);//Push all the elements to the array because they will be in the right order
            }
            return reverseArray;
        }
    },
    swap: function (array, index1, index2) {
        if (this.isEmpty(array)) {
            return "ERRO!";
        } else {
            var guarda = array[index1]; //Save the value on the index1 because he will be deleted after getting the value of the index2
            array[index1] = array[index2];//Set index1 to index2
            array[index2] = guarda; //Set index2 value to guarda that will be the index1
            return array;
        }
    },
    contains: function (array, value) {
        if (this.isEmpty(array)) {
            return "ERRO!";
        } else {
          return this.indexOf(array,value) != -1;
        }
    },
    concatenate: function (array1,array2) {
        if (this.isEmpty(array1) || this.isEmpty(array2)){
            return "ERRO!";
        }
        else{
            var arrayConcat = [];
            arrayConcat.push(array1,array2);

            return arrayConcat;
        }
    }
}

module.exports = arrayFunctions;
