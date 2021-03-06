var connect = require('connect');
var serveStatic = require('serve-static');
var dirTree = require('directory-tree');
var fs = require('fs');
var conf = require('./config.json');
// var ClientOAuth2 = require('client-oauth2')

// console.log(request.headers.host);

var app = connect();
var p = [8000, 8001, 8002];

var user = process.env.USER || 'toni';

console.log(user)

/*
 * Vars
 */

console.log(__dirname);

var dirlist =  [__dirname, conf[user].dirlist].join('/');
var mp3path = [__dirname, conf[user].mp3path].join('/');
var playlist_path = [__dirname, conf[user].playlist_path].join('/');



/*
 * Services
 */

// Set up default headers
app.use((req, res, next)=> {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

// mp3 list service
app.use('/list', (req, res, next) => {
    var tree = dirTree(mp3path, ['.mp3']);
    fs.writeFileSync(dirlist, JSON.stringify(tree));
    res.end(JSON.stringify(tree));
    next();
});


// Playlist service
var playlist = (req, res, next) => {
    
    // If we get a wrong method, we just return 405 and exit.
    if (['GET', 'POST', 'OPTIONS', 'DELETE'].indexOf(req.method) == -1) {
        res.writeHead(405, {'Content-Type': 'text/plain'});
        res.end('You can not use ' + req.method + ' to this resource!');
        next();
        return;
    }
    
    // Fill up the playlist with data recieved
    var playlist = ''; req.on('data', (data) => { playlist += data; });
    
    // get playlist function
    var get_playlist = () => {
        fs.exists(playlist_path, (exists) => {
            var out = exists ? fs.readFileSync(playlist_path) : '';
            res.end(out);
            next();
        });
    }
    if(req.method == 'GET') req.on('end', get_playlist);
       
    // Save playlist function
    var save_playlist = () => {
        fs.exists(playlist_path, (exists) => {
            if(exists) {
                playlist = JSON.parse(playlist).filter((item)=>{
                    return item=='' ? false : true;
                }).join("\n");
            }
            //  playlist = exists ? JSON.parse(playlist).join("\n") : '';
            out = exists ? {response: true} : {response: false};
            fs.writeFile(playlist_path, playlist, (err) => {
                if (err) throw err;
            });
            res.end(JSON.stringify(out));
            next();
        });
    };
    if(req.method == 'POST') req.on('end', save_playlist);

    // Delete playlist
    var delete_playlist = () => {
        fs.exists(playlist_path, (exists) => {
            var out = exists ? {response: true} : {response: false};
            if (exists) fs.unlinkSync(playlist_path);
            res.end(JSON.stringify(out));
            next();
        });
    }
    if (req.method == 'DELETE') delete_playlist();
    
    // Respond to OPTIONS
    if(req.method == 'OPTIONS') {
        res.end('');
        next();
    }
};
app.use('/playlist', playlist);


/*
 * application server
 */

app.use(serveStatic(__dirname + '/src'));
app.listen(p[0]);
console.log('Running: app on port ' + p[0] + '!');



/*
 * Serve static files
 */
connect().use(serveStatic(__dirname + '/dist')).listen(p[1]);
console.log('Running: development on port ' + p[1]);
