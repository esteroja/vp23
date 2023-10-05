const http = require("http"); //nodejsi moodul http
const dateTime = require('./datetime_et');
const url = require("url");
const path  = require("path"); //haagime kõlge serveerile failitee
const fs = require("fs"); //see moodul täis asju mis oskavad kasutada failisüsteeme, nt faili lugeda kirjutada jne
const querystring = require('querystring');

const pageHead = '<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="utf-8"><title>Ester Ojala, veebiprogrammeerimine 2023</title></head><body>';
const pageBanner = '\n\t<img src="banner.png" alt="Kursuse banner">';
const pageBody = `\n\t<h1>Ester Ojala</h1>\n\t<h2>Lehe avamise hetkel oli <br>${dateTime.dateETformatted()}<br>${dateTime.timeFormatted()}</h2>\n\t<p>Veebileht on valminud <a href="https://www.tlu.ee" target="_blank">TLÜ</a> DTI informaatika eriala õppetöö raames.</p>`;
const pageFoot = '\n\t<hr></body></html>';

const graphicElement = '<meter min="0" max="x" value="y"></meter>'
const monthNamesET = ["jaanuar", "veerbuar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"];

function semProgressValue() {
    let semStart = new Date("08/28/2023");
    let semEnding = new Date("01/28/2024");
    let dateNow = new Date();
    if (semStart > dateNow ) {
        semValue = "Semester pole veel alanud";
    }
    if (semEnding < dateNow) {
        semValue = "Semester on läbi";
    }
    if (semStart < dateNow && semEnding > dateNow) {
        let semLastedFor = Math.floor((dateNow.getTime() - semStart.getTime()) / (1000 * 60 * 60 * 24));
        let semEndingIn = Math.floor((semEnding.getTime() - dateNow.getTime()) / (1000 * 60 * 60 * 24));
        let semDays = Math.floor((semEnding.getTime() - semStart.getTime()) / (1000 * 60 * 60 * 24));
        semValue = "Semester on kestnud " + semLastedFor + " päeva. Semestri lõpuni on jäänud " + semEndingIn + ` päeva.<br><meter min='0' max='${semDays}' value='${semLastedFor}'></meter>`;
    }
    return semValue;
}

http.createServer(function(req, res) { //request, response/result
    let currentURL = url.parse(req.url, true); //parsimine on andmete lahtiharutamine, req on päring
    if(req.method ==='POST'){
        collectRequestData(req, result => {
            console.log(result);
            //kirjutame andmeid tekstifaili
            fs.open('public/log.txt', 'a', (err, file) => {//a-> kui faili pole olemas siis see luuakse
                if (err) {
                    throw err;
                }
                else {
                    fs.appendFile('public/log.txt', result.firstNameInput + ';', (err)=>{
                        if (err) {
                            throw err;
                        }
                        else {
                            console.log("Faili kirjutati");
                        }
                    }); //fs.appendFile kirjutab faili lõppu teksti juurde
                }
                fs.close(file, (err)=>{
                    if (err) {
                        throw err;
                    }
                });
            }); 
            res.end(result.firstNameInput);
        });
    }

    if (currentURL.pathname === "/") {
        res.writeHead(200, {"Content-type": "text/html"});
        res.write(pageHead);
        res.write(pageBanner)
        res.write(pageBody);
        res.write('\n\t<hr>\n\t<a href="addName">Lisa oma nimi</a>');
        res.write('\n\t<hr>\n\t<a href="semProgress">Semestri progress</a>');
        res.write('\n\t<hr>\n\t<a href="tluPhoto">Pilt TLÜ Terra hoonest</a>');
        res.write(pageFoot);
        return res.end();
    }

    else if (currentURL.pathname === "/addName") {
        res.writeHead(200, {"Content-type": "text/html"});
        res.write(pageHead);
        res.write(pageBanner)
        res.write(pageBody);
        res.write('\n\t<hr>\n\t<h2>Lisa palun oma nimi!</h2>');
        res.write('\n\t<p><form  method="POST"><label for="firstNameInput">Eesnimi: </label><br><input type="text" name="firstNameInput" id="firstNameInput" placeholder="Sinu eesnimi ..."><br><label for="lastNameInput">Perekonnanimi: </label><br><input type="text" name="lastNameInput" id="lastNameInput" placeholder="Sinu perekonnanimi ..."><br><input type="submit" name="nameSubmit" value="Salvesta"></form></p>');
        res.write(pageFoot);
        return res.end();
    }

    else if (currentURL.pathname === "/semProgress") {
        res.writeHead(200, {"Content-type": "text/html"});
        res.write(pageHead);
        res.write(pageBanner);
        res.write(pageBody);
        res.write('\n\t<hr><h2>Semestri progress</h2>');
        let semProgressCall = semProgressValue();
        res.write(semProgressCall);
        res.write(pageFoot);
        return res.end();
    }

    else if (currentURL.pathname === "/tluPhoto") {
        //loeme kataloogist fotode nimekirja ja loosime ühe pildi
        let htmlOutPut = '\n\t<p>Pilti ei saa näidata</p>';
        let listOutPut = '';
        fs.readdir('public/tluphotos', (err, fileList)=>{ //loeb kataloogi, callbacki asjad, kas on mingi error, mis on koha nimi kust failid tulevad(filelist)
            if (err) {
                throw err;
                tluPhotoPage(res, htmlOutPut); //paned sulgudesse need, et saadab need infod ära alla functsiooni, kus need kinni püütakse
            }
            else {
                //console.log(fileList);
                let photoNum = Math.floor(Math.random() * fileList.length); //filelisti suvalise pildi leidmine, 0st 42ni juhuslik arv
                htmlOutPut = '\n\t<img src="' + fileList[photoNum] + '" alt="TLÜ pilt">';
                //console.log(htmlOutPut);
                listOutPut = '\n\t<ul>';
                for (element of fileList) {
                    listOutPut += '\n\t<li>' + element + '</li>';
                }
                listOutPut += '\n\t</ul>';
                tluPhotoPage(res, htmlOutPut, listOutPut);
            }
        });
        
    }

    else if (currentURL.pathname === "/banner.png") {
        console.log("Tahame pilti");
        let bannerPath = path.join(__dirname, "public", "banner"); //dirname on path mooduliga sisseehitatud muutuja mis tähistab selle lehe failiteed(kaldkriipsuleht). kaldkriipsu pole juurde vaja kirjutada sest juurkataloog ise on nagu kaldkriips
        fs.readFile(bannerPath + currentURL.pathname, (err, data)=> { //currentUrl.pathname asemel võib panna "/banner.png"
            if (err) {
                throw err;
            }
            else {
                res.writeHead(200, {"Content-type": "image/png"});
                res.end(data);
            }
        });
    }

    else if (path.extname(currentURL.pathname) === ".jpg") {
        console.log(path.extname(currentURL.pathname)); //extname sõelub välja punkti ja jpg
        let photoPath = path.join(__dirname, "public", "tluphotos"); //dirname on path mooduliga sisseehitatud muutuja mis tähistab selle lehe failiteed(kaldkriipsuleht). kaldkriipsu pole juurde vaja kirjutada sest juurkataloog ise on nagu kaldkriips
        fs.readFile(photoPath + currentURL.pathname, (err, data)=> { //currentUrl.pathname asemel võib panna "/banner.png"
            if (err) {
                throw err;
            }
            else {
                res.writeHead(200, {"Content-type": "image/jpg"});
                res.end(data);
            }
        });
    }

    else {
        res.end("ERROR 404");
    }
    //valmis, saada ära
}).listen(5128); //pordi number mida kuulad(?), pm veebilehe teemiseks
//link on greeny.cs.tlu.ee:5128, vaja enne puttys kirjutada node www2.js


function tluPhotoPage(res, htmlOutPut, listOutPut) { //püütakse varem saadetud info kinni
    res.writeHead(200, {"Content-type": "text/html"});
    res.write(pageHead);
    res.write(pageBanner);
    res.write(pageBody);
    res.write('\n\t<h2>Tallinna Ülikooli pilt</h2>');
    res.write(htmlOutPut);
    if(listOutPut != ''){
        res.write(listOutPut);
    }
    res.write('\n\t<img src="tlu_42.jpg" alt="Tallinna Ülikooli pilt">');
    res.write(pageFoot);
    return res.end();
}

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let receivedData = '';
        request.on('data', chunk => {
            receivedData += chunk.toString();
        });
        request.on('end', () => {
            callback(querystring.decode(receivedData));
        });
    }
    else {
        callback(null);
    }
}

//KODUS: peab tegema lehe selliseks et tekstifaili salvestatakse nt "eesnimi, perekonnanimi,kuupäev millal inimene salvestas", tuleb date muuta eestipäraseks (vanasõnade splittimise järgi sqaab teha, võib tulla massiiv kus sees on veel massiiv, names[0],names[1]-> perekonnanimi[0][1])