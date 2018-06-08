const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'hbs')

app.get('/', function (req, res) {
  db.collection('quotes').find().toArray(function(err, results) {
    console.log(results)
    res.render('index.hbs', {quotes: results})
  })
  // res.render('index.hbs')
});
app.post('/show', function (req, res) {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)
    
    console.log('saved to database')
    res.redirect('/')
  })
});

let db;
MongoClient.connect('mongodb://tonielton:tonielton123@ds247310.mlab.com:47310/products-db-testing', (err, client) => {
  if (err) return console.log(err) 
  db = client.db('products-db-testing')

  app.listen(3000, function() {
    console.log('server running port 3000')
  })

})
