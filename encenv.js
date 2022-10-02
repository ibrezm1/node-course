// Match comment (^#) or blank (^(?![\s\S])) 

// Functionality 
// Encrpty the .env file but keep the esence 
// minimal user toil
// should be able to commit
// identify user system / env variable

var commentpattern = /((^#)|(^(?![\s\S])))/i;

const { EncrptStrings } = require('./crypto')
var fs = require('fs');
var argv = require('yargs')
    .options('k', {
        //demand: true,//this argument is require
        alias: 'key',
        describe: 'key for encryption',
        string: true//always parse the address argument as a string
    })
    .options('e', {
        alias: 'encrypt'
    })
    .options('d', {
        alias: 'decrypt'
    })
    .options('if', {
        alias: 'in-file',
        describe: 'Address to fetch weather for',
        default: '.env'
    })
    .options('of', {
        alias: 'out-file',
        describe: 'Address to fetch weather for',
        default: '.enc'
    })
    .argv;

var src, type;

if (!argv.d) {
    src = '.env'
    targ = '.enc'
    type = 'e'
} else {
    src = '.enc'
    targ = '.env'
    type = 'd'
}

//src = argv.if ? argv.if :src 
//targ = argv.of ? argv.of :targ 

if (!fs.existsSync(src)) {
    console.log('Source file does not exists')
    process.exit(1);
}
const outf = []

if (process.env.Z_KEY) {
    key = process.env.Z_KEY
    iv = process.env.Z_IV
}

const es = new EncrptStrings(key, iv)
fs.readFileSync(src, 'utf-8')
    .split('\n').forEach(function (line) {
        if (!commentpattern.test(line)) {
            var keys = line.split(/=(.*)/s)
            keys.pop()
            keys[1] = es.apply(type, keys[1])
            line = keys.join('=');
        }

        console.log(line)
        //writeLine(line)
        outf.push(line)


    })

fs.writeFileSync(targ, outf.join('\n'), "utf-8", { 'flags': 'w+' });