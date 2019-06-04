const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
var path = "./output.txt"

function createFile(){
    var data = "O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão.";
    if(!fs.existsSync(path)){
        var repeated = "";
        for(var i = 0; i < 10000; i++){
            repeated += data + "\n";
        }
        fs.writeFileSync(path,repeated);
    }
}
createFile();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));