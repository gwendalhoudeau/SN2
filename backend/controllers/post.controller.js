const PostModel = require('../models/post.model')
const UserModel = require('../models/user.model')
const fs = require('fs')
const { promisify } = require('util')
const { uploadErrors } = require('../utils/error.utils')
const pipeline = promisify(require('stream').pipeline)
const ObjectID = require('mongoose').Types.ObjectId

module.exports.readPost = (req, res) => {
    PostModel.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log('error to get data :' + err)
    })
}

module.exports.createPost = async (req, res) => {
    let fileName
    if (req.file) {
        console.log(54654654)
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

        fileName = req.body.posterId + Date.now() + '.jpg'
        
        const {path} = req.file;  
        const path2 = require('path');
        
        // Créer un chemin pour le fichier sur le serveur
        const newFilePath = path2.join(__dirname, '..','..', 'frontend', 'public', 'uploads', 'posts', fileName);
        
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
        
    }
    console.log(546)
    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.file ? "./uploads/posts/" + fileName : "",
        video: req.body.video ? req.body.video : "",
        likers: [],
        comments: [],
    })
    try {
        const post = await newPost.save()
        return res.status(201).json(post)
    } catch {
        return res.status(400).send(err)
    }
}

module.exports.updatePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("id unknown : " + req.params.id)

    const updateRecord = {
        message: req.body.message
    }

    PostModel.findByIdAndUpdate(
        req.params.id,
        { $set: updateRecord },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs)
            else console.log('update error: ' + err)
        }
    )
}

module.exports.deletePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("id unknown : " + req.params.id)

    PostModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs)
            else console.log("delete error :" + err)
        }
    )
}

module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("id unknown : " + req.params.id)

    try {
        PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id }
            },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs)
                if (err) return res.status(400).send(err)
            }
        )
        UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id }
            },
            { new: true },
            (err, docs) => {
                //if (!err) res.send(docs)
                if (err) return res.status(400).send(err)
            }
        )
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.unLikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("id unknown : " + req.params.id)

    try {
        PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id }
            },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs)
                if (err) return res.status(400).send(err)
            }
        )
        UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id }
            },
            { new: true },
            (err, docs) => {
                //if (!err) res.send(docs)
                if (err) return res.status(400).send(err)
            }
        )
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.commentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("id unknown : " + req.params.id)

    try {
        return PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime()
                    },
                    "$position": 0
                }
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs)
                else return res.status(400).send(err)
            }
        )
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.editCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("id unknown : " + req.params.id)

    try {
        return PostModel.findById(
            req.params.id,
            (err, docs) => {
                const thecomment = docs.comments.find((comment) =>
                    comment._id.equals(req.body.commentId)
                )

                if (!thecomment) return res.status(404).send('comment not found')
                thecomment.text = req.body.text

                return docs.save((err) => {
                    if (!err) return res.status(200).send(docs)
                    return res.status(500).send(err)
                })
            }
        )
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.deleteCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("id unknown : " + req.params.id)
    try {
        return PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId
                    }
                }
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs)
                else return res.status(400).send(err)
            }
        )
    } catch (err) {
        return res.status(400).send(err)
    }
}