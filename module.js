exports.timestamp = function(){
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
}