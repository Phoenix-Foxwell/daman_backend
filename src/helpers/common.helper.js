const path = require('path')
const fs = require('fs')
const client = require('https');
var axios = require("axios");
const config = require('../../config/config');

class CommonHelper {
   
    uploadImage = (image,image_path,string) => {
        var rawData = fs.readFileSync(image.path)
        let ext = image.type;
        ext = ext.split('/')[1]
        let filename = string + new Date().getTime() + '.' + ext;
        var newPath = path.join(image_path) + '/' + filename
        fs.writeFile(newPath, rawData, function (err) {
            if (err) console.log(err)
        })
        return filename;
    }
     uploadBase64Image =  (file_path, base64Data,string) => {
       
            var imagedata=base64Data.split(",")[1]
            var extenstion = base64Data.match(/[^:/]\w+(?=;|,)/)[0];
            let filename = string + new Date().getTime() + '.' + extenstion;
            var path = file_path +filename;
            fs.writeFile(path, imagedata, 'base64', (err, result) => {
            if (err) console.log(err)
               
            });
            return filename
        
    }
    deleteImageFromFolder =  (file_path) => {
        return new Promise(resolve => {
            fs.unlink(file_path, (err, result) => {
                console.log(err);
                return resolve(result)
            });
    
        });
    }
}

module.exports = new CommonHelper();
