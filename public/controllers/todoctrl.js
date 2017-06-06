app.controller('todoctrl', function ($scope, $sessionStorage, $location, todofac) {
    
    if(!$sessionStorage.user)
        $location.path('/');
    $scope.username = $sessionStorage.user.username;
    $scope.tasks = [];
    $scope.add = function () {
        var title = $scope.title;
        var desc = $scope.desc;
        var priority = $scope.priority;
        var time = Date.now();
        var userid = $sessionStorage.user._id;
        var obj = {
            title: title
            , description: desc
            , priority: priority
            , createdOn: time
            , userid: userid
        };
        var promise = todofac.addTask(obj);
        promise.then(function (data) {
            $sessionStorage.user.tasks = data.data;
            $scope.tasks = $sessionStorage.user.tasks;
            console.log(data);
            Materialize.toast('Task added...', 2000);
            $scope.op = 0;
        }, function (err) {
            console.log(err);
            Materialize.toast('An error occured...', 2000);
        });
    };
    $scope.refresh = function () {
        var id = $sessionStorage.user._id;
        var promise = todofac.refresh(id);
        var arr = [];
        promise.then(function (data) {
            var tids = data.data;
            for (var i = 0; i < tids.length; i++) {
                var prom = todofac.retrieve(tids[i]);
                prom.then(function (data1) {
                    arr.push(data1.data);
                }, function (err) {
                    Materialize.toast('An error occured...', 2000);
                });
            }
            $scope.tasks = arr;
            Materialize.toast('Task list refreshed', 2000);
        }, function (err) {
            console.log(err);
            Materialize.toast('An error occured...', 2000);
        });
    };
    $scope.delete = function (tid) {
        var arr = [];
        var uid = $sessionStorage.user._id;
        var promise = todofac.delete(uid, tid);
        promise.then(function (data) {
            var tids = data.data;
            for (var i = 0; i < tids.length; i++) {
                var prom = todofac.retrieve(tids[i]);
                prom.then(function (data1) {
                    arr.push(data1.data);
                }, function (err) {
                    Materialize.toast('An error occured...', 2000);
                });
            }
            $scope.tasks = arr;
            Materialize.toast('Task deleted', 2000);
        }, function (err) {
            console.log(err);
            Materialize.toast('An error occured...', 2000);
        });
    };
    $scope.complete = function (index) {
        var time = Date.now();
        var tasks = $scope.tasks;
        var task = tasks[index];
        var tid = task._id;
        var uid = $sessionStorage.user._id;
        var promise = todofac.complete(uid, tid, time);
        promise.then(function (data) {
            $scope.refresh();
        }, function (err) {
            console.log(err);
            Materialize.toast('An error occured...', 2000);
        });
    };
    $scope.initedit = function (index) {
        $scope.op = 3;
        var tasks = $scope.tasks;
        var title = tasks[index].title;
        var description = tasks[index].description;
        var priority = tasks[index].priority;
        var id = tasks[index]._id;
        $scope.temptask = {
            title: title
            , description: description
            , priority: priority
            , id: id
        };
    };
    $scope.edit = function () {
        $scope.op = 0;
        var time = Date.now();
        var tid = $scope.temptask.id;
        var title = ($scope.utitle === undefined) ? $scope.temptask.title : $scope.utitle;
        var description = ($scope.udesc === undefined) ? $scope.temptask.description : $scope.udesc;
        var priority = ($scope.upriority === undefined) ? $scope.temptask.priority : $scope.upriority;
        var promise = todofac.updateTask(tid, time, title, description, priority);
        promise.then(function (data) {
            $scope.refresh();
        }, function (err) {
            console.log(err);
            Materialize.toast('An error occured...', 2000);
        });
    }
    $scope.logout = function(){
        delete $sessionStorage.user;
        $location.path('/');
    }
    $scope.refresh();
});