var users = require('./dbschema-users');
var tasks = require('./dbschema-tasks');
var us = require('underscore');
var obj = {
    getUserForLogin: function (em, pw, res) {
        users.findOne({
            email: em
            , passwd: pw
        }, function (err, data) {
            if (err) res.send(err);
            else res.send(data);
        });
    }
    , checkUsernameAvailability: function (un, res) {
        users.findOne({
            username: un
        }, function (err, data) {
            if (err) res.send(err);
            else res.send(data);
        });
    }
    , checkEmailAvailability: function (em, res) {
        users.findOne({
            email: em
        }, function (err, data) {
            if (err) res.send(err);
            else res.send(data);
        });
    }
    , addUser: function (em, pw, un, res) {
        var newuser = new users({
            email: em
            , passwd: pw
            , username: un
            , tasks: []
        });
        newuser.save(function (err, data) {
            if (err) res.send(err);
            else res.send(data);
        })
    }
    , createTask: function (userid, title, description, priority, createdOn, res) {
        var newtask = new tasks({
            title: title
            , description: description
            , priority: priority
            , createdOn: createdOn
            , lastUpdated: createdOn
        });
        newtask.save(function (err, data) {
            if (err) res.send(err);
            else tasks.findOne({
                createdOn: createdOn
            }, function (err, data) {
                if (err) res.send(err);
                else {
                    users.findOne({
                        _id: userid
                    }, function (err, doc) {
                        if (err) console.log(err);
                        else {
                            doc['tasks'].push(data._id);
                            doc.save();
                            res.send(doc.tasks);
                        }
                    })
                }
            });
        });
    }
    , getTasks: function (uid, res) {
        users.findOne({
            _id: uid
        }, function (err, data) {
            if (err) res.send(err);
            else res.send(data.tasks);
        });
    }
    , deleteTask: function (uid, tid, res) {
        var tt;
        tasks.findOne({
            _id: tid
        }, function (err1, data1) {
            if (err1) res.send(err1);
            else {
                tt = data1._id;
            }
        });
        tasks.findByIdAndRemove(tid, function (err2, data2) {
            if (err2) res.send(err2);
            else {
                users.findOne({
                    _id: uid
                }, function (err3, doc) {
                    if (err3) console.log(err3);
                    else {
                        var arr = [];
                        for (var i = 0; i < doc["tasks"].length; i++) {
                            var item = doc["tasks"][i];
                            if (us.isEqual(tt, item)) continue;
                            else arr.push(item);
                        }
                        doc['tasks'] = arr;
                        doc.save();
                        res.send(doc.tasks);
                    }
                })
            }
        });
    }
    , completeTask: function (uid, tid, time, res) {
        tasks.findOne({
            _id: tid
        }, function (err, doc) {
            if (err) res.send(err);
            else {
                /*var tt = doc;*/
                doc.isCompleted = true;
                doc.completedOn = time;
                doc.save();
                //console.log(doc);
                res.send(doc);
            }
        });
    }
    , retrieveTask: function (tid, res) {
        tasks.findOne({
            _id: tid
        }, function (err, doc) {
            if (err) res.send(err);
            else res.send(doc);
        });
    }
    , updateTask: function (tid, time, title, desc, priority, res) {
        tasks.findOne({
            _id: tid
        }, function (err, data) {
            if (err) res.send(err);
            else {
                data.lastUpdated = time;
                data.title = title;
                data.description = desc;
                data.priority = priority;
                data.save();
                res.send(data);
            }
        });
    }
};
module.exports = obj;