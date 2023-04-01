const mongoose = require('mongoose');

mongoose.set('strictQuery', true)

mongoose.connect('mongodb+srv://' + process.env.DB_USER_PASS + '@cluster0.yb4qdcs.mongodb.net/test',
{
    //userNewUrlParser: true,
    //useUnifiedTopology:true,
    //useCreateIndex:true,
    //useFindAndModify:false,
    
})
.then(() => console.log('Connected to mongoDB'))
.catch((err) => console.log('failer to connect to mongodb',err))

