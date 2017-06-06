app.factory('todofac', function ($http, $q) {
    return {
        addTask: function (obj) {
            var q = $q.defer();
            //Materialize.toast('Adding Task...', 2000);
            $http.post('/addTask', obj).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , refresh: function (id) {
            var q = $q.defer();
            //Materialize.toast('Refreshing...', 2000);
            $http.post('/refresh', {
                id: id
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , delete: function (uid, tid) {
            var q = $q.defer();
            Materialize.toast('Deleting...', 2000);
            $http.post('/delete', {
                uid: uid
                , tid: tid
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , complete: function (uid, tid, time) {
            var q = $q.defer();
            $http.post('/complete', {
                uid: uid
                , tid: tid
                , time: time
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , retrieve: function (tid) {
            var q = $q.defer();
            $http.post('/retrieve', {
                tid: tid
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , updateTask: function (tid, time, title, desc, priority) {
            var q = $q.defer();
            $http.post('/update', {
                tid: tid
                , time: time
                , title: title
                , desc: desc
                , priority: priority
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
    };
});