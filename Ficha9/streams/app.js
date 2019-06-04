const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const zlib = require('zlib');
var path1 = "./output.txt";
var path2 = "./input.txt";
var path3 = "./pipe.txt";
var path4 = "./file.zip";

var zipFile = zlib.createGzip();


function readFile(){
    fs.readFileSync(path);
    console.log("File has been read!");
}
//readFile();

var readStream = fs.createReadStream(path1);
var chunckWrite = fs.createWriteStream(path2);

readStream.on('data', function(chunck){
    console.log(chunck);
    chunckWrite.write(chunck);
})

readStream.on('end', function(chunck){
    console.log("Completed Stream");
    chunckWrite.end();
})

var writeStream = fs.createWriteStream(path3);

//Write file with pipe
readStream.pipe(writeStream);

var writeStreamtoZip = fs.createWriteStream(path4);
readStream.pipe(zipFile).pipe(writeStreamtoZip);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
