const http = require("http"); //nodejsi moodul http
const dateTime = require('./datetime_et');
const url = require("url");
const path  = require("path"); //haagime kõlge serveerile failitee
const fs = require("fs"); //see moodul täis asju mis oskavad kasutada failisüsteeme, nt faili lugeda kirjutada jne

const pageHead = '<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="utf-8"><title>Ester Ojala, veebiprogrammeerimine 2023</title></head><body>';
const pageBanner = '\n\t<img src="banner.png" alt="Kursuse banner">';
const pageBody = `\n\t<h1>Ester Ojala</h1>\n\t<h2>${dateTime.dateETformatted()}<br>${dateTime.timeFormatted()}</h2>\n\t<p>Veebileht on valminud <a href="https://www.tlu.ee" target="_blank">TLÜ</a> DTI informaatika eriala õppetöö raames.</p>`;
const pageFoot = '\n\t<hr></body></html>';

http.createServer(function(req, res){ //request, response/result
    let currentURL = url.parse(req.url, true); //parsimine on andmete lahtiharutamine, req on päring
    if (currentURL.pathname === "/") {
        res.writeHead(200, {"Content-type": "text/html"});
        res.write(pageHead);
        res.write(pageBanner)
        res.write(pageBody);
        res.write('\n\t<hr>\n\t<p><a href="addName">Lisa oma nimi</p>');
        res.write(pageFoot);
        return res.end();
    }

    else if (currentURL.pathname === "/addName") {
        res.writeHead(200, {"Content-type": "text/html"});
        res.write(pageHead);
        res.write(pageBanner)
        res.write(pageBody);
        res.write('\n\t<hr>\n\t<h2>Lisa palun oma nimi!</h2>');
        res.write('\n\t<p>Edaspidi lisame siia oma asju</p>');
        res.write(pageFoot);
        return res.end();
    }

    else if (currentURL.pathname === "/banner.png") {
        console.log("Tahame pilti");
        let bannerPath = path.join(__dirname, "public", "banner"); //dirname on path mooduliga sisseehitatud muutuja mis tähistab selle lehe failiteed(kaldkriipsuleht). kaldkriipsu pole juurde vaja kirjutada sest juurkataloog ise on nagu kaldkriips
        console.log(bannerPath + currentURL.pathname);
        fs.readFile(bannerPath + currentURL.pathname, (err, data)=> { //currentUrl.pathname asemel võib panna "/banner.png"
            if (err) {
                throw err;
            } else {
                res.writeHead(200, {"Content-type": "image/png"});
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