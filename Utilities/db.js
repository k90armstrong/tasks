const sqlite3 = require('sqlite3').verbose();

var state = {
    db: null
};

exports.connect = function (url, done) {
    if (!!state.db) {
        return done();
    }

    let db = new sqlite3.Database(url, (err) => {
        if (err) {
            console.error(err.message);
            return done(err);
        }
        console.log('Connected to db');
        state.db = db;
        return done();
    });
};

exports.get = function () {
    return state.db;
};

exports.close = function (done) {
    if (!!state.db) {
        state.db.close((err) => {
            state.db = null;
            state.mode = null;
            return done(err);
        });
    }
};