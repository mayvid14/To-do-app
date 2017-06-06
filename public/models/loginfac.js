app.factory('loginfac', function ($http, $q) {
    return {
        login: function (em, pw) {
            var q = $q.defer();
            $http.post('/loginpost', {
                'em': em
                , 'pw': pw
            }).then(function (data) {
                q.resolve(data)
            }, function (err) {
                q.reject(err)
            });
            return q.promise;
        }
        , check: function (name) {
            var q = $q.defer();
            $http.post('/checkavail', {
                un: name
            }).then(function (data) {
                q.resolve(data)
            }, function (err) {
                q.reject(err)
            });
            return q.promise;
        }
        , reg: function (em) {
            var q = $q.defer();
            $http.post('/checkreg', {
                em: em
            }).then(function (data) {
                q.resolve(data)
            }, function (err) {
                q.reject(err)
            });
            return q.promise;
        }
        , signup: function (em, pw, un) {
            var q = $q.defer();
            $http.post('/signuppost', {
                'em': em
                , 'pw': pw
                , un: un
            }).then(function (data) {
                q.resolve(data)
            }, function (err) {
                q.reject(err)
            });
            return q.promise;
        }
    };
});