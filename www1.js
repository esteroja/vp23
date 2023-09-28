const http = require("http"); //nodejsi moodul http
const dateTime = require('./datetime_et');

http.createServer(function(req, res){ //request, response/result
    res.writeHead(200, {"Content-type": "text/html"});
    res.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Ester Ojala, veebiprogrammeerimine 2023</title></head><body>');
    res.write(`<h1>Ester Ojala</h1><h2>${dateTime.dateETformatted()}<br>${dateTime.timeFormatted()}</h2><p>Veebileht on valminud <a href="https://www.tlu.ee" target="_blank">TLÜ</a> DTI informaatika eriala õppetöö raames.</p>`);
    res.write('<hr></body></html>');
    console.log("Keegi vaatab"); //näitab konsoolil kui keegi refreshib lehte
    //valmis, saada ära
    return res.end();
}).listen(5128); //pordi number mida kuulad(?), pm veebilehe teemiseks
//link on greeny.cs.tlu.ee:5128, vaja enne puttys kirjutada node www2.js