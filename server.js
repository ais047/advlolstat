const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const request = require('request');
const cors = require('cors')

app = express();

app.use(cors())
app.use(serveStatic(__dirname + "/dist"));
const port = process.env.PORT || 3000;

app.get('/name', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    let summoner = req.query.summoner
    request.get('https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + summoner + '?api_key=RGAPI-f9742994-37b5-4824-b89a-211cd32cdfaf',
    function(err, data) {
        if (err) {
            console.err(err)
        }
        else {
            res.send(data)
        }
    })
})

app.get('/id', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    let summid = req.query.summid
    request.get('https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/' + summid + '?beginIndex=0&endIndex=2&api_key=RGAPI-f9742994-37b5-4824-b89a-211cd32cdfaf',
    function(err, data) {
        if (err) {
            console.err(err)
        }
        else {
            res.send(data)
        }
    })
})

app.get('/matches', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    let matchid = req.query.matchid
    request.get('https://na1.api.riotgames.com/lol/match/v3/matches/' + matchid + '?beginIndex=0&endIndex=2&api_key=RGAPI-f9742994-37b5-4824-b89a-211cd32cdfaf',
    function(err, data) {
        if (err) {
            console.err(err)
        }
        else {
            res.send(data)
        }
    })
})

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
    });


app.listen(port);
console.log('server started '+ port);