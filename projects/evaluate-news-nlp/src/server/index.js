const dotenv = require('dotenv');
dotenv.config();

const axios = require('axios');

var path = require('path')
const express = require('express')
const bodyParser = require('body-parser');

const mockAPIResponse = require('./mockAPI.js')

const app = express()

var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({ extended: false })


// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies
app.use(bodyParser.json());

app.use(express.static('dist'))
const apiKey = process.env.API_KEY;
console.log(`Your API key is ${apiKey}`)
console.log(__dirname)

app.post('/analyze', urlencodedParser, async (req, res) => {
    try {
      const response = await axios.postForm('https://api.meaningcloud.com/sentiment-2.1', {
        key: apiKey,
        lang: 'en',
        txt: req.body.text,
      });
  
    // Did we get a response?
    console.log('response from meaningcloud', response);
  

      // Handle the API response here
      res.send(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error occurred');
    }
  });

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT || 8081, function () {
  console.log('Example app listening on port 8081!');
});


app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
