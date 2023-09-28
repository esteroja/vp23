const firstName = "Ester";
const lastName = "Ojala";
const datetimeValue = require("./datetime_et"); 
const fs = require("fs"); // fs on nimi file system, mooduli nimi -- oskus pöörduda faili poole, fs on nodei mingi standardmoodul
let folkWisdom = "";

fs.readFile("txtfiles/vanasonad.txt", "utf8", (err, data)=> {
    if(err){
        console.log(err); //error
    }
    else {
        //console.log(data); //saime teksti kätte
        //folkWisdom = data;
        putOnScreen(data); //data saatmine, nimi unustatakse ära, aint andmed antakse edasi
    }
}); //avad txt faili kataloogist, encoding, callback funktsioon ehk tagasiside ehk antaks teada mis toimus ja kas toimis. readFile lõppeb

const putOnScreen = function(folkWisdom) { //siin funktdiooni sulgudes püütakse data andmed kinni, nimetatakse ümber??
    console.log("Programmi autor on: " + firstName + " " + lastName);
    console.log("Täna on " + datetimeValue.dateETformatted());
    //console.log(folkWisdom);
    let folkWisdoms = folkWisdom.split(";"); //ühe suure jaotamine tükkideks semikooloni koha pealt
    //console.log(folkWisdoms)
    //console.log(folkWisdoms.length); //näitab mitu elementi on listis
    //console.log("Tänane tarkus: " + folkWisdoms[Math.floor(Math.random() * folkWisdoms.length)]); //random genereerib suvalise numbri vahemikus 0 kuni 1, floor on ümardamise funktsioon mis ümardab alla täisarvuks
    //kõige tavalisem for tsükkel(loop) - kõigepealt defineeritakse reeglid e määratakse ära muutujad ja palju kordub, teisena on piirang kuhu maani läheb, viimasena tuleb reegel et kuidas see tsükkel jõuab lõpuni
    for (let i = 0; i < folkWisdoms.length; i ++) { //sama mis i = i + 1, aint nr 1-ga nii, saab - ka panna
        console.log("Vanasõna nr " + (i + 1) + ': "' + folkWisdoms[i] + '"');
    }
    console.log("Kell on " + datetimeValue.timeFormatted()); //sama moodul aga need funktsioonid vms on erinevad
    console.log("Praegu on " + datetimeValue.timeOfDayET());
    console.log(datetimeValue.monthsET); //sulge pole sest list??
}

//selleks et järjekorda saada õigeks võid panna console logid funktsiooni sisse, enne on lis faililugemine
