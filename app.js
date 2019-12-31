var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var validator = require('express-validator');

Song = require('./models/song.js');
Album = require('./models/album.js');

var app = express(); // object that represents the express app

// Middleware
app.use(bodyParser.json());

// Connect to Mongoose
mongoose.connect('mongodb://localhost/donovan', { 
    useUnifiedTopology: true, // removes DeprecationWarning: current Server Discovery and Monitoring engine
    useNewUrlParser: true, // removes DeprecationWarning: current URL string parser
    useFindAndModify: false // removes DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` 
                            // without the `useFindAndModify` option set to false
});

var db = mongoose.connection; // database object - when do we use this??

// Routes
app.get('/', function(req, res) {
    res.send('hurdy gurdy');
});

// Routes - Songs
app.get('/api/songs', function(req, res) { // Get all songs
    Song.getSongs(function(err, songs) {
        if (err) {
            throw err;
        }
        res.json(songs);
    })
});
app.get('/api/songs/:_id', function(req, res) { // Get song by ID
    validator.param('_id').isMongoId().trim(); // check for proper mongo id. else will return null
    Song.getSongById(req.params._id, function(err, song) {
        if (err) {
            throw err;
        }
        res.json(song);
    })
});
app.post('/api/songs', function(req, res) { // Add song
    var newSong = req.body;
    Song.addSong(newSong, function(err, song) {
        if (err) {
            throw err;
        }
        res.json(song);
    })
});
app.put('/api/songs/:_id', function(req, res) { // Update song
    var id = req.params._id;
    var updatedSong = req.body;
    Song.updateSong(id, updatedSong, {new: true}, function(err, song) {
        if (err) {
            throw err;
        }
        res.json(song);
    })
});
app.delete('/api/songs/:_id', function(req, res) { // Delete song
    var id = req.params._id;
    Song.deleteSong(id, function(err, song) {
        if (err) {
            throw err;
        }
        res.json(song);
    })
});

// Routes - Albums
app.get('/api/albums', function(req, res) { // Get all albums
    Album.getAlbums(function(err, albums) {
        if (err) {
            throw err;
        }
        res.json(albums);
    })
});
app.get('/api/albums/:_id', function(req, res) { // Get album by ID
    validator.param('_id').isMongoId().trim(); // check for proper mongo id. else will return null
    Album.getAlbumById(req.params._id, function(err, album) {
        if (err) {
            throw err;
        }
        res.json(album);
    })
});
app.post('/api/albums', function(req, res) { // Add album
    var newAlbum = req.body;
    Album.addAlbum(newAlbum, function(err, album) {
        if (err) {
            throw err;
        }
        res.json(album);
    })
});
app.put('/api/albums/:_id', function(req, res) { // Update album
    var id = req.params._id;
    var updatedAlbum = req.body;
    Album.updateAlbum(id, updatedAlbum, {new: true}, function(err, album) {
        if (err) {
            throw err;
        }
        res.json(album);
    })
});
app.delete('/api/albums/:_id', function(req, res) { // Delete album
    var id = req.params._id;
    Album.deleteAlbum(id, function(err, album) {
        if (err) {
            throw err;
        }
        res.json(album);
    })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});