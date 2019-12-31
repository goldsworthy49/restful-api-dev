var mongoose = require('mongoose');

// Song Schema
var songSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    createDate: { // very important for pretty much every db
        type: Date,
        default: Date.now // this needs to be implemented before objects are added.
                          // otherwise the date will refresh with every request
    }
});

// export Song object and pairs it with a schema. Must come before functions
var Song = module.exports = mongoose.model('Song', songSchema);

// .select('-__v') removes "_v":0

// Get Songs
module.exports.getSongs = function(callback, limit) {
    Song.find(callback).limit(limit).select('-__v');
};

// Get Song by ID
module.exports.getSongById = function(id, callback) {
    Song.findById(id, callback).select('-__v');
};

// Add Song
module.exports.addSong = function(title, callback) {
    Song.create(title, callback);
};

// Update Song
module.exports.updateSong = function(id, updatedSong, options, callback) {
    var options;
    var query = {_id: id};
    var update = {
        title: updatedSong.title
    };
    Song.findOneAndUpdate(query, update, options, callback);
};

// Delete Song
module.exports.deleteSong = function(id, callback) {
    var query = {_id: id};
    Song.remove(query, callback);
}