angular.module('myApp.service',[]).
    factory('DataSource', ['$http',function($http){
       return {
           get: function(file,callback,transform){
                $http.get(
                    file,
                    {transformResponse:transform}
                ).
                success(function(data, status) {
                    console.log("Request succeeded");
                    callback(data);
                }).
                error(function(data, status) {
                    console.log("Request failed " + status);
                });
           }
       };
    }]);

angular.module('myApp',['myApp.service']);

var AppController = function($scope,DataSource) {

    var SOURCE_FILE = "guitars.xml";
    
    $scope.IMAGE_LOCATION = "http://rabidgadfly.com/assets/angular/xmlload/";
    
    xmlTransform = function(data) {
        console.log("transform data");
        var x2js = new X2JS();
        var json = x2js.xml_str2json( data );
        return json.guitars.guitar;
    };
    
    setData = function(data) {
        $scope.dataSet = data;
    };
        
    DataSource.get(SOURCE_FILE,setData,xmlTransform);
    
};