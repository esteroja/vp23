exports.dateETformatted = function(){

    const monthNamesET = ["jaanuar", "veerbuar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"];
    let dateNow = new Date();
    let dateET = dateNow.getDate() + ". " + monthNamesET[dateNow.getMonth()] + " " + dateNow.getFullYear();
    console.log(dateET);
    return dateET;
 }
