var app = angular.module('todoapp',['ngRoute','ngStorage']);

app.filter('convDate', function(){
    return function(num){
        var time = new Date(num);
        var date = time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+" on "+time.getDate()+"/"+(time.getMonth()+1)+"/"+time.getFullYear();
        return date;
    }
});