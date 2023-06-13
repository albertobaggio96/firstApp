const mongoClient = require('mongodb').MongoClient;
let dbConnection : any

module.exports = {
    connectToDb: (cb : any) =>{
        mongoClient.connect('mongodb://0.0.0.0:27017/todoslist')
        .then((client : any) => {
            dbConnection = client.db();
            return cb();
        })
        .catch((err: Error) => {
            console.log(err);
            return cb(err);
        })
    },
    getDb: () => { return dbConnection}
}


