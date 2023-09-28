exports.timeFormatted = function() {

    let timestamp = new Date();
    //let timestampEE = timestamp.getHours() + ":" + timestamp.getMinutes() + ":" + timestamp.getSeconds();
    return timestamp.getHours() + ":" + timestamp.getMinutes() + ":" + timestamp.getSeconds();
}