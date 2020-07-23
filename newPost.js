var fs = require('fs');
var mkdirp = require('mkdirp');

var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();
var title = process.argv[2];

if (month < 10) {
    month = '0' + month;
}

if (day < 10) {
    day = '0' + day;
}

var dir = __dirname + '/src/pages/posts/' + year + '/' + month + '/' + day + '/' + title + '/';
var file = dir + title + '.md';
console.log(day, month, year);
console.log(title);
console.log(dir);

mkdirp(dir, function(err) {
    if (err) {
        console.error(err);
    }

    console.log('DIRECTORY CREATED');
    fs.writeFile(file, '', function(err) {
        if (err) throw err;
        console.log('FILE CREATED');
    });
});
