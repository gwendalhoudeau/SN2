const UserModel = require('../models/user.model')

const ObjectId = require ('mongoose').Types.ObjectId


module.exports.getAllUsers = async (req,res) => {
    const users = await UserModel.find().select('-password')
    res.status(200).json(users)
}

module.exports.userInfo = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Id unkown : ' + req.params.id)

    UserModel.findById(req.params.id, (err,docs) => {
        if(!err) res.send(docs)
        else console.log('id unknown ' + err)
    }).select('-password')
}

module.exports.updateUser = (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Id unkown : ' + req.params.id)

    try{
         UserModel.findOneAndUpdate(
            
            {_id:req.params.id},
            {
                $set: {
                    bio: req.body.bio
                }
            },
            {new: true, upsert: true, setDefaultOnInsert: true},
            (err,docs) => {
                if (!err) return res.send(docs)
                if (err) return res.status(500).send({message: err})
            }
        )
    }
    catch (err){
        if (err) return res.status(500).send({message: err}) 
    }
}

module.exports.deleteUser = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Id unkown : ' + req.params.id)

    try{
         await UserModel.remove({_id: req.params.id}).exec()
         res.status(200).json({message: "supprimé avec succés"})
    }
    catch (err){
        if (err) return res.status(500).send({message: err})
    }
}

module.exports.follow = async (req, res) => {
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToFollow))
        return res.status(400).send("id unknown")
    try {
        //add to followers
        UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) docs = res.status(201).json(docs)
                if (err) return res.status(400).json(err)
            }
        )
        //add to following
        UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, docs) => {
                //if (!err) return res.status(201).json(docs); 
                if (err) return res.status(400).json(err)
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}



module.exports.unfollow = async (req, res) => {
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToUnfollow))
        return res.status(400).send("id unknown : " + req.params.id)
    try {
        //add to followers
        UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnfollow } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) doc = res.status(201).json(docs)
                if (err) return res.status(400).json(err)
            }
        )
        //add to following
        UserModel.findByIdAndUpdate(
            req.body.idToUnfollow,
            { $pull: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, docs) => {
                //if (!err) return res.status(201).json(docs); 
                if (err) return res.status(400).json(err)
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}