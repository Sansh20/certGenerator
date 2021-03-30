
var fs = require("fs");

const { registerFont, createCanvas, loadImage } = require('canvas')
const getDetails = require('./details')
const mailer = require('./mail')

var image
var context;
var imgH;
var imgW;
var fileName = './test.jpg';

registerFont('./EndlessBossBattle.ttf', {family:'Endless Boss Battle'});

loadImage(fileName).then((loadedImage)=>{
    image = loadedImage;
    imgW = image.width;
    imgH = image.height;
})

function generateCert(name){
    let cert = createCanvas(imgW, imgH)
    context = cert.getContext('2d');
    context.drawImage(image, 0, 0, imgW, imgH);
    context = cert.getContext('2d');
    context.font = '72px "Endless Boss Battle"';
    context.fillStyle = "#00558E";
    context.fillText(name, 82, 424);
    const buffer = cert.toBuffer('image/jpeg')
    fs.writeFileSync('./genCert/cert-'+name+'.jpg', buffer)
}

getDetails().then((details)=>{
    for(let i in details){
        generateCert(details[i]['Name'])
        mailer(details[i]['Name'], details[i]['Email'], "Hello Test Subject!");
    }
})