var arrayFunctions = {
    isEmpty: function (array) {
        if (array.length > 0) { // If lengh > 0 it means the array is not empty
            return false;
        } else {
            return true;
        }
    },
    max: function (array) {
        if (arrayFunctions.isEmpty(array)) {
            return;
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
        if (arrayFunctions.isEmpty(array)) {
            return;
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
        if (arrayFunctions.isEmpty(array)) {
            return;
        } else {
            var soma = 0; //Set soma to 0
            for (var i = 0; i < array.length; i++) { //Go throught the entire array and sum all the values
                soma += array[i];
            }
            return soma / array.length; //Average = SUM OF ALL / TOTAL OF NUMBERS ADDED
        }
    },
    indexOf: function (array, value) {
        if (arrayFunctions.isEmpty(array)) {
            return;
        } else {
            return array[value];//Simply return the value of the position given
        }
    },
    subArray: function (array, startIndex, endIndex) {
        if (arrayFunctions.isEmpty(array)) {
            return;
        } else {
            var sub_array = [];//Set sub_array to an empty array
            for (var i = startIndex; i <= endIndex; i++) {//Start the for in the start index and end it on the end index
                sub_array.push(array[i]);//Add all the values between start and end to the sub_array
            }
            return sub_array;
        }
    },
    isSameLenght: function (array1, array2) {
        if (arrayFunctions.isEmpty(array)) {
            return;
        } else {
            if (array1.length == array2.length) {//Just check if sizes match or not
                return true;
            } else {
                return false;
            }
        }
    },
    reverse: function (array) {
        if (arrayFunctions.isEmpty(array)) {
            return;
        } else {
            var reverseArray = [];
            for (var i = array.length - 1; i >= 0; i--) {//Start going throught the array from the last position ultil the first
                reverseArray.push(array[i]);//Push all the elements to the array because they will be in the right order
            }
            return reverseArray;
        }
    },
    swap: function (array, index1, index2) {
        if (arrayFunctions.isEmpty(array)) {
            return;
        } else {
            var guarda = array[index1]; //Save the value on the index1 because he will be deleted after getting the value of the index2
            array[index1] = array[index2];//Set index1 to index2
            array[index2] = guarda; //Set index2 value to guarda that will be the index1
            return array;
        }
    },
    contains: function (array, value) {
        if (arrayFunctions.isEmpty(array)) {
            return;
        } else {
            var contain = false;
            for (var i = 0; i < array.length; i++) {//Go throught the entire array
                if (array[i] == value) {//Check if the current value matches the value we want
                    contain = true;//If it does set contain to true
                }
            }
            return contain;
        }
    }
}

module.exports = arrayFunctions;
