var mongoose = require('mongoose');

// Album Schema
var albumSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    releaseDate:{
        type: String
    },
    producer:{
        type: String
    },
    imageUrl:{
        type: String,
        required: true
    },
    totalTime:{
        type: String
    },
    genre:{
        type: String
    },
    createDate: { // very important for pretty much every db
        type: Date,
        default: Date.now
    }
});

// export Album object and pairs it with a schema. Must come before functions
var Album = module.exports = mongoose.model('Album', albumSchema);

// Get Albums
module.exports.getAlbums = function(callback, limit) {
    Album.find(callback).limit(limit);
};

// Get Album by ID
module.exports.getAlbumById = function(id, callback) {
    Album.findById(id, callback);
};

// Add Album
module.exports.addAlbum = function(title, callback) {
    Album.create(title, callback);
};

// Update Album
module.exports.updateAlbum = function(id, updatedAlbum, options, callback) {
    var options;
    var query = {_id: id};
    var update = {
        title: updatedAlbum.title,
        releaseDate: updatedAlbum.releaseDate,
        producer: updatedAlbum.producer,
        imageUrl: updatedAlbum.imageUrl,
        totalTime: updatedAlbum.totalTime,
        genre: updatedAlbum.genre
    };
    Album.findOneAndUpdate(query, update, options, callback);
};

// Delete Album
module.exports.deleteAlbum = function(id, callback) {
    var query = {_id: id};
    Album.remove(query, callback);
}