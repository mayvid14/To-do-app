var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var dbops = require(path.join(__dirname, 'db', 'dbops.js'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/nodemods', express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser.json());
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});
app.post('/loginpost', function (req, res) {
    var em = req.body.em;
    var pw = req.body.pw;
    dbops.getUserForLogin(em, pw, res);
});
app.post('/checkavail', function (req, res) {
    var un = req.body.un;
    dbops.checkUsernameAvailability(un, res);
});
app.post('/checkreg', function (req, res) {
    var em = req.body.em;
    dbops.checkEmailAvailability(em, res);
});
app.post('/addTask', function (req, res) {
    var title = req.body.title;
    var description = req.body.description;
    var priority = req.body.priority;
    var createdOn = req.body.createdOn;
    var userid = req.body.userid;
    dbops.createTask(userid, title, description, priority, createdOn, res);
});
app.post('/refresh', function (req, res) {
    var uid = req.body.id;
    dbops.getTasks(uid, res);
});
app.post('/delete', function (req, res) {
    var uid = req.body.uid;
    var tid = req.body.tid;
    dbops.deleteTask(uid, tid, res);
})
app.post('/signuppost', function (req, res) {
    var em = req.body.em;
    var pw = req.body.pw;
    var un = req.body.un;
    dbops.addUser(em, pw, un, res);
});
app.post('/complete', function (req, res) {
    var uid = req.body.uid;
    var tid = req.body.tid;
    var time = req.body.time;
    dbops.completeTask(uid, tid, time, res);
});
app.post('/retrieve', function (req, res) {
    var tid = req.body.tid;
    dbops.retrieveTask(tid, res);
});
app.post('/update', function (req, res) {
    var tid = req.body.tid;
    var time = req.body.time;
    var title = req.body.title;
    var desc = req.body.desc;
    var priority = req.body.priority;
    dbops.updateTask(tid,time,title,desc,priority,res);
})
app.listen(1234, function () {
    console.log('Connected to port no. 1234');
});