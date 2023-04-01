const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true
        },
        message: {
            type: String,
            trim: true,
            maxlength: 500
        },
        picture: {
            type:String
        },
        video:{
            type:String
        },
        likers:{
            type: [String],
            required:true
        },
        comments:{
            type:[
                {
                    commenterId:String,
                    commenterPseudo:String,
                    text:String,
                    timestamp:Number,
                }
            ],
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
          }
    }, { timestamps: true }
)
/*
PostSchema.pre("save", async function (next) {
    const now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next()
})*/

module.exports = mongoose.model('post',PostSchema)