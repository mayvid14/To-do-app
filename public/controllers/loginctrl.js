app.controller('loginctrl', function ($scope,$sessionStorage,$location, loginfac) {
    //$scope.$storage = $sessionStorage;
    /*if(typeof $sessionStorage.user !== undefined){
        $location.path('/portal');
    }*/
        
    
    $scope.isAvail = false;
    $scope.isReg = false;
    $scope.login = function () {
        var email = $scope.liemail;
        var passwd = $scope.lipasswd;
        var promise = loginfac.login(email, passwd);
        promise.then(function (data) {
            $sessionStorage.user = data.data;
            $location.path('/portal');
        }, function (error) {
            console.log(error);
        });
    };
    $scope.checkavail = function () {
        var name = $scope.username;
        var promise = loginfac.check(name);
        promise.then(function (data) {
            if (data.data.username === name) $scope.isAvail = false;
            else $scope.isAvail = true;
        }, function (error) {
            console.log(error);
        });
    };
    $scope.checkreg = function () {
        var em = $scope.suemail;
        var promise = loginfac.reg(em);
        promise.then(function (data) {
            if (data.data.email === em) $scope.isReg = true;
            else $scope.isReg = false;
        }, function (error) {
            console.log(error);
        });
    };
    $scope.signup = function () {
        var email = $scope.suemail;
        var passwd = $scope.supasswd;
        var username = $scope.username;
        var promise = loginfac.signup(email, passwd, username);
        promise.then(function (data) {
            console.log('Hello ', data.data.username);
        }, function (error) {
            console.log(error);
        });
    };
});