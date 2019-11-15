const mysql2 = require('mysql2')

/*
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient()



const MongoConnect = (callback) => {

    MongoClient.connect('mongodb+srv://shouvik:microwis@shouvik-fr89m.mongodb.net/test?retryWrites=true&w=majority')
    .then(client => {
        console.log('successfully connected to mongodb')
        // callback(client)
    })
    .catch(err => {
        console.log(err)
    })


}
*/

// Always close a connection once 
// you're done with a query

const pool = mysql2.createPool({
    host:'localhost',
    user:'root',
    database:'node_complete',
    password:'microwis'
})

exports.db = pool.promise()
// exports.MongoConnect = MongoConnect
