(function() {
  
    const app = angular.module('simple', []);
    app      
      .controller('index', ['$scope', '$http', indexController]);
  
    function indexController($scope, $http, naturalLanguage) {
      $scope.message = 'Hello Angular!';
      $scope.getEmotionAnalysis = getEmotionAnalysis;
      $scope.arrEmotions = [];
  
      init();
  
      function init() {
        // Get Henry Data
        $getJson = $http.get('/henry')
          .then(function(data){
            // Load Natural language service
            $scope.getEmotionAnalysis(data.data);
          });    
      }
  
      /**
       * Call IBM Watson Emotion Analysis
       * @param {object} data - Henry IV data
       */
      function getEmotionAnalysis(data) {

        angular.forEach(data, function(item) {
          $http.post('/emotion', item)
            .then(function(data){
              item.emotions = data.data;
              $scope.arrEmotions.push(item);
            });                      
        });        
      }
    }
    
  }());
  