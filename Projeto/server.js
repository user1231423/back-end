const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const uuidv1 = require('uuidv1');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//PARTE A
//Função que lê o ficheiro e devolve o que foi lido
function readFile(fileName) {
    var file = fs.readFileSync(fileName, 'utf-8');
    return file;
}

//Função construtora para criar um objeto recebendo o nome e os dados para colocar
function createObj(name, data) {
    var obj = {};
    obj[name] = data;
    obj[name].id = uuidv1(); //Gerar um id unico
    return obj;
}

//Listar todas as fotos no ficheiro photos.json
app.get('/photos', function(req, res) {
    var file = readFile("./photos.json");
    if (file.length <= 2) {
        res.send("Ficheiro vazio");
    } else {
        res.writeHead(200, {
            'Content-Type': 'application/json' //Definir content-type como json para o texto aprarecer formatado em JSON
        });
        res.write(file); //Escrever na resposta o ficheiro
        res.send();
    }
});

//Adicionar nova imagem
/* Este é um exemplo do body a utilizar no postman não é necessario id visto que ele é gerado automaticamente
{
    "uploader": "alexandre",
    "title": "xxx",
    "descripton": "aaa",
    "size": 2,
    "url": "sdfsdfsdgsfgcxvsds.com",
    "likes": 40,
    "dislikes": 44,
    "comments": [
        "sss", 
        "Não ss"
    ],
    "tags": [
        "tag1",
        "sss"
    ]
} */
app.post('/photo', function(req, res) {
    var file = readFile("./photos.json");
    if (file.length != 0) {
        var obj = JSON.parse(file); //Passar um objeto em json para um objeto de javascript
        var size = Object.keys(obj).length; //obeter a length do objeto
        var name = "photo" + (size + 1);
        var bodyData = req.body;
        if (Object.keys(bodyData).length == 0){
            res.send("Sem dados para criar!")
        }else{
            obj[name] = req.body;
            obj[name].id = uuidv1(); //Gerar novo id para a nova foto
            var objStr = JSON.stringify(obj); //Passar objeto em javascript para JSON
            fs.writeFileSync("./photos.json", objStr);
            res.send("Foto Adicionada!");
        }
    } else {
        data = req.body; //fazer request dos dados do body
        obj = createObj("photo" + (file.length + 1), data); //Criar um objeto com os dados recebidos no body e com o nome de photo + a length do objeto + 1
        var objStr = JSON.stringify(obj);
        fs.writeFileSync("./photos.json", objStr);
        res.send("Foto Adicionada!");
    }
});

//Obter todos as fotos de um uploader
app.get('/photo/user/:name', function(req, res) {
    var file = readFile("./photos.json");
    if (file.length <= 2) {
        res.send("Ficheiro Vazio!");
    } else {
        var uploader = req.params.name;
        var obj = JSON.parse(file);
        var size = Object.entries(obj).length;
        var entries = Object.entries(obj);
        var name;
        var lista = {};
        for (var i = 0; i < size; i++) {
            name = Object.entries(obj)[i][0];
            if (obj[name].uploader == uploader) { //Encontar o uploader
                lista[entries[i][0]] = obj[name];
            }
        }
        if (Object.keys(lista).length == 0) {
            res.send("Sem fotos para este utilizador!");
        } else {
            res.json(lista);
        }
    }
});

//Atualizar likes de uma foto pelo id da mesma, o numero de likes irá ser o anterior + 1
app.put('/photo/likes/:id', function(req, res) {
    var file = readFile("./photos.json");
    if (file.length <= 2) {
        res.send("Ficheiro Vazio!");
    } else {
        var id = req.params.id;
        var obj = JSON.parse(file);
        var size = Object.entries(obj).length;
        var entries = Object.entries(obj);
        var name;
        var retornar = {};
        var entrou = false;
        for (var i = 0; i < size; i++) {
            name = entries[i][0];
            if (obj[name].id == id) { //Encontar o id que procuramos
                entrou = true;
                obj[name].likes += 1; //Incrementar os likes da foto
                retornar[entries[i][0]] = obj[name];
            }
        }
        if (entrou) {
            //Escrever o ficheiro já com os likes incrementados
            var objStr = JSON.stringify(obj);
            fs.writeFileSync("./photos.json", objStr);
            res.json(retornar);
        } else {
            res.send("Foto não existe!");
        }
    }
});

//Listar todas as fotos com determinados tags
/* Conteudo do body
{
	"tags": ["tag1","sss"]
}
*/
app.get('/tags', function(req, res) {
    var file = readFile("./photos.json");
    if (file.length <= 2) {
        res.send("Ficheiro Vazio!");
    } else {
        var tags = req.body.tags; //tags recebe um array de tags visto que no ficheiro as tags são tambem um array
        if (tags == undefined){
            res.send("Sem resultados!")
        }else{
            var obj = JSON.parse(file);
            var size = Object.entries(obj).length;
            var entries = Object.entries(obj);
            var name;
            var retornar = {};
            var entrou = false;
            for (var i = 0; i < size; i++) { //Passar pelo objeto inteiro
                name = entries[i][0];
                for (var x = 0; x < tags.length; x++) { //Passar pelo array tags de cada objeto dentro do objeto principal
                    if (obj[name].tags[x] == tags[x]) { //Verificar se as tagas são iguais
                        entrou = true;
                        retornar[name] = obj[name];
                    }
                }
            }
            if (entrou) {
                res.json(retornar); //Retornar o json com os valores da resposta
            } else {
                res.send("Sem resultados!");
            }
        }
    }
});
//FIM PARTE A

//INICIO PARTE B
//Escrever os nomes das fotos por ordem numerica, caso estejam ordenados irá trocar o nome dos mesmos e colocar de 1 ate ao ultimo
//mas irão continuar ordenados por ordem de likes embora não estejam por nome
function ordenarFicheiro() {
    var file = readFile("./photos.json");
    var obj = JSON.parse(file);
    var entries = Object.entries(obj);
    var orderedName = {};
    var num = 0;
    for (var i = 0; i < Object.entries(obj).length; i++) {
        var name = entries[i][0];
        num += 1;
        orderedName["photo" + num] = obj[name]; //Photo + numero = obj[name] para ficar algo como "photo1" : {"uploader": "Testando",.....}
    }
    //Escrever o ficheiro
    var str = JSON.stringify(orderedName);
    fs.writeFileSync("./photos.json", str)
}

//Obter uma fotografia atraves do id
app.get('/photo/:id', function(req, res) {
    var file = readFile("./photos.json");
    if (file.length <= 2) {
        res.send("Ficheiro vazio!");
    } else {
        var id = req.params.id;
        var obj = JSON.parse(file);
        var entries = Object.entries(obj);
        var resposta = {};
        for (var i = 0; i < Object.entries(obj).length; i++) {
            var name = entries[i][0];
            if (obj[name].id == id) { //Encontar a foto que procuramos
                resposta = obj[name];
            }
        }
        if (Object.keys(resposta).length == 0) {
            res.send("Sem resultados!");
        } else {
            res.json(resposta);
        }
    }
});

//Apagar uma fotografia a partir do id
app.delete('/photo/:id', function(req, res) {
    ordenarFicheiro();
    var file = readFile("./photos.json");
    if (file.length <= 2) {
        res.send("Ficheiro Vazio!");
    } else {
        var id = req.params.id;
        var obj = JSON.parse(file);
        var entries = Object.entries(obj);
        for (var i = 0; i < Object.entries(obj).length; i++) {
            var name = entries[i][0];
            if (obj[name].id == id) { //Encontrar o id que procuramos
                delete obj[name]; //Apagar o objeto
                //Escrever o ficheiro ja com o objeto apagado
                var str = JSON.stringify(obj);
                fs.writeFileSync("./photos.json", str);
                //Ordenar o ficheiro com os nomes corretos para as fotos, apagamos a 1 entao a 2 passa a 1 e o mesmo acontece com as seguintes
                ordenarFicheiro();
                res.send('Foto eliminada!!')
            }
        }
    }
});

//Incrementar o numero de dislikes a partir do id
app.put('/photo/dislikes/:id', function(req, res) {
    var file = readFile("./photos.json");
    if (file.length <= 2) {
        res.send("Ficheiro Vazio!");
    } else {
        var id = req.params.id;
        var obj = JSON.parse(file);
        var size = Object.entries(obj).length;
        var entries = Object.entries(obj);
        var name;
        var retornar = {};
        var entrou = false;
        for (var i = 0; i < size; i++) {
            name = entries[i][0];
            if (obj[name].id == id) { //encontrar o id que procuramos
                entrou = true;
                obj[name].dislikes += 1; //Incrementar o numero de dislikes
                retornar[entries[i][0]] = obj[name];
            }
        }
        if (entrou) {
            var objStr = JSON.stringify(obj);
            fs.writeFileSync("./photos.json", objStr);
            res.json(retornar);
        } else {
            res.send("Foto não existe!");
        }
    }
});

//Adicionar comentarios a uma foto a partir do id
/*
{
	"comments": ["É um comentario","comment"]
}
*/
app.put('/photo/comments/:id', function(req, res) {
    var file = readFile("./photos.json");
    if (file.length <= 2) {
        res.send("Ficheiro Vazio!");
    } else {
        var id = req.params.id;
        var comment = req.body.comments;
        if (comment == undefined){
            res.send("Sem comentarios para adicionar!")
        }else{
            var file = readFile("./photos.json");
            var obj = JSON.parse(file);
            var entries = Object.entries(obj);
            var entrou = false;
            for (var i = 0; i < Object.entries(obj).length; i++) {
                var name = entries[i][0];
                if (obj[name].id == id) { //Encontar o id que procuramos
                    for(var x = 0; x < comment.length; x++){
                        obj[name].comments.push(comment[x]);//adicionar um comentario ao array dos comentarios
                    }
                    entrou = true;
                    var str = JSON.stringify(obj);
                    fs.writeFileSync("./photos.json", str);
                }
            }
            if (entrou){
                res.send('Comentario adicionado');
            }else{
                res.send("Foto não existe!");
            }
        }
    }
});

//Ordenar as fotos a partir de um buble sort
app.put('/photo/ordenar', function(req, res) {
    var file = readFile("./photos.json");
    if (file.length <= 2) {
        res.send("Ficheiro Vazio!");
    } else {
        var obj = JSON.parse(file);
        var entries = Object.entries(obj);
        var size = Object.entries(obj).length;
        var swapped;
        do { //Enquanto swapped for verdadeiro faz o ciclo, entra a falso para o caso de nao necessitar alterações sair logo
            swapped = false;
            for (var i = 0; i < size - 1; i++) {
                //se os likes da primeira posiçao forem menores que os da proxima a primeira posição fica com o valor da proxima de forma a que a lista va decrescendo do menor até ao menor
                if (obj[entries[i][0]].likes < obj[entries[i + 1][0]].likes) {
                    var temp = entries[i][0]; //variavel temporaria para armazenar o primeiro valor
                    entries[i][0] = entries[i + 1][0]; //primeiro valor = proximo
                    entries[i + 1][0] = temp; //proximo igual ao primeiro
                    swapped = true; //swapped true pois trocou
                }
            }
        } while (swapped);
        //Ordenar o objeto para que apareçam os nomes das fotos corretamente da com mais likes até à com menos likes
        var ordenados = {};
        for (var i = 0; i < size; i++){
            ordenados[entries[i][0]] = obj[entries[i][0]]
        }
        //Escrever o ficheiro de modo a ficar em ordem descendente de ordem de likes(maiores primeiro)
        var str = JSON.stringify(ordenados);//Stringigy dos ordenados pois são eles que possuem a ordem correta
        fs.writeFileSync("./photos.json", str);
        res.json(ordenados);
    }
});
//FIM PARTE B

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`);
});