(function() {
  
    const app = angular.module('simple', []);
    app.controller('index', ['$scope', '$http', indexController]);
  
    function indexController($scope, $http, naturalLanguage) {
      // Methods      
      $scope.getEmotion = getEmotion;

      // Init variables
      $scope.arrEmotions = [];
      $scope.arrEmotionsActive = -1;
      $scope.arrEmotionsMessage = "";
  
      init();
  
      function init() {
        // Get Henry Data
        $getJson = $http.get('/henry')
          .then(function(data){
            // Load Natural language service
            $scope.arrEmotions = data.data;
          });    
      }      

      function getEmotion(id) {
        $http.post('/emotion', $scope.arrEmotions[id])
          .then(function(data){
            $scope.arrEmotionsActive = id;
            $scope.arrEmotionsMessage = JSON.stringify(data);
            console.log(id);
          });
      }
    }
    
  }());
  