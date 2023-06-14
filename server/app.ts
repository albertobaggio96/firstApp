
interface todo {_id : string, title : string}

const express = require('express');
const cors = require('cors');

const { connectToDb, getDb} = require('./db');
const { ObjectId } = require('mongodb');

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*'
}));

let db: any

connectToDb((err : Error) => {
    if(!err){
        app.listen('3000', () => {
            console.log('app listening on port 3000');
        });
        db = getDb();
    }
})

app.get('/todos', (req : any, res: any) =>{
  let todos : todo[] = []

  db.collection('todos')
    .find()
    .forEach((todo : todo ) => todos.push(todo))
    .then(() => {
      res.status(200).json(todos)
    })
})


