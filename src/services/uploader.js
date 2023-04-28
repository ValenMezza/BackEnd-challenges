import multer from "multer";
import __dirname from "../util.js";
import { urlencoded } from "express";

//¿Donde voy a almacernar todo?

const storage = multer.diskStorage({
    //DESTINATION HACE REFRERENCIA A LA CARPETA
    destination: function(req, file, cb){
        cb(null, `${__dirname}/public/img`)
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})


const uploader = multer({storage});

export default uploader;
