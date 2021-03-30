const csvParser = require('csv-parser');
const fs = require('fs');

const file = "./data.csv";
var dataJson =[]
var i = 0;

async function getDetails(){
    return new Promise((resolve, reject)=>{
        fs.createReadStream(file)
        .on('error', (err)=>{
            reject(err);
        })
        .pipe(csvParser())
        .on('data', (raw)=>{
            dataJson[i]=(raw);
            i++;
        })
        .on('end', ()=>{
            resolve(dataJson);
        })
    })
}

module.exports = getDetails;

    