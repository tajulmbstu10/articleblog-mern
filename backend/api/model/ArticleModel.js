const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title:{
        type:String,
        trim:true,
        required:true,

    },
    description:{
        type:String,
        trim:true,        
        required:true  
    }

},{ collection: 'article' })


const ArticleModel = mongoose.model('article',articleSchema)

module.exports = ArticleModel;