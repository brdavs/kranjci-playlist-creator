var connect = require('connect');
var serveStatic = require('serve-static');
var dirTree = require('directory-tree');
var fs = require('fs');

var app = connect();
var p = [8000, 8001, 8002];

var mp3path = __dirname + '/mp3';
var playlist_path = __dirname + '/mp3/playlist.m3u';

/*
 * Services
 */

// Set up default headers
app.use((req, res, next)=> {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// mp3 list service
var list = (req, res, next) => {
    var tree = dirTree(mp3path, ['.mp3']);
    res.end(JSON.stringify(tree));
    next();
}
app.use('/list', list);


// Playlist service
var playlist = (req, res, next) => {
    
    // If we get a wrong method, we just return 405 and exit.
    if (['POST', 'OPTIONS'].indexOf(req.method) == -1) {
        res.writeHead(405, {'Content-Type': 'text/plain'});
        res.end('You can only POST to this resource!');
        next();
        return;
    }

    // Fill up the playlist with data recieved
    playlist = ''; req.on('data', (data) => { playlist += data; });
    
    // Save playlist function
    var save_playlist = () => {
        fs.exists(playlist_path, (exists) => {
            playlist = exists ? JSON.parse(playlist).join("\n") : '';
            out = exists ? {response: true} : {response: false};
            fs.writeFile(playlist_path, playlist, (err) => {
                if (err) throw err;
            });
            res.end(JSON.stringify(out));
            next();
        });
    };
    
    if(req.method == 'OPTIONS') {
        res.end('');
        next();
    }
    
    if(req.method == 'POST') req.on('end', save_playlist);
};
app.use('/playlist', playlist);
app.listen(p[0]);
console.log('Running: service on port ' + p[0] + '!');

/*
 * Serve static files
 */
connect().use(serveStatic(__dirname + '/src')).listen(p[1]);
connect().use(serveStatic(__dirname + '/dist')).listen(p[2]);
console.log('Running: development on port ' + p[1] + ', distro on port ' + p[2] + '!');
