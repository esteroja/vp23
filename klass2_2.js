const firstName = "Ester";
const lastName = "Ojala";
const dateValue = require("./date_et"); //faili/mooduli nõudmine, ./ tähendab kataloog kõrgem, date_et faili nimi
console.log("Programmi autor on: " + firstName + " " + lastName);

let dateETNow = dateValue.dateETformatted(); //funktsiooni käima panemine läbi mooduli (mis võeti datevalues) kaudu
console.log("Täna on: " + dateETNow);
console.log("Täna on tõesti " + dateValue.dateETformatted());

const timeValue = require("./time");
console.log("Kell on: " + timeValue.timeFormatted());