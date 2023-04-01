const UserModel = require('../models/user.model')
const fs = require('fs')
const { promisify } = require('util')
const { uploadErrors } = require('../utils/error.utils')
const pipeline = promisify(require('stream').pipeline)



module.exports.uploadProfil = async (req, res) => {
    try {
        if (req.file.mimetype !== "image/jpg" &&
            req.file.mimetype !== "image/jpeg" &&
            req.file.mimetype !== "image/png")

            throw Error("invalid file")

        if (req.file.size > 500000) throw Error("max size")

    } catch (err) {
        const errors = uploadErrors(err)
        //return res.status(201).json({ errors })
    }

    const { originalname, path } = req.file;
    const fileName = req.body.name + ".jpg"
    const path2 = require('path');

    // Créer un chemin pour le fichier sur le serveur
    const newFilePath = path2.join(__dirname, '..', 'client', 'public', 'uploads', 'profil', fileName);

    // Créer un flux de lecture depuis le fichier téléchargé
    const readStream = fs.createReadStream(path);

    // Créer un flux d'écriture vers le nouveau fichier sur le serveur
    const writeStream = fs.createWriteStream(newFilePath);

    // Copier le contenu du fichier téléchargé vers le nouveau fichier sur le serveur
    readStream.pipe(writeStream);

    // Une fois la copie terminée, supprimer le fichier temporaire téléchargé
    writeStream.on('finish', () => {
        fs.unlinkSync(path);
    });

    // Envoyer une réponse au client
    //res.send('Le fichier a été téléchargé avec succès!');

    try{
        UserModel.findByIdAndUpdate(
            req.body.userId,
            {$set: {picture: "./uploads/profil/" + fileName}},
            {new:true,upsert:true, setDefaultsOnInsert:true},
            (err,docs) => {
                if(!err) return res.send(docs)
                if(err) return res.status(500).send({message:err})
            }
        )
    } catch (err) {
        return res.status(500).send({message:err})
    }
}