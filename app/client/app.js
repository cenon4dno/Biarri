(function() {
  
    const app = angular.module('simple', []);
    app
      .constant('NaturalLanguage', {
          method: 'POST',
          url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ZTAxYzZhM2QtMTk2NS00MWZlLWIyZGYtYjc0MzBiNzJkNzIwOlZlWmVhbGU4Y3hCcg=='            
          },
          data: {
            "version": "2017-02-27",
            "text": "IBM is an American multinational technology company headquartered in Armonk, New York, United States, with operations in over 170 countries.",
            "features": {
              "entities": {
                "emotion": true,
                "sentiment": true,
                "limit": 2
              },
              "keywords": {
                "emotion": true,
                "sentiment": true,
                "limit": 2
              }
            }
          }
      })
      .controller('index', ['$scope', '$http', 'NaturalLanguage', indexController]);
  
    function indexController($scope, $http, naturalLanguage) {
      $scope.message = 'Hello Angular!';
      $scope.getEmotionAnalysis = getEmotionAnalysis;
  
      init();
  
      function init() {
        // Get Henry Data
        $getJson = $http.get('/henry_iv.json')
          .then(function(data){
            console.log('here1');
            // Load Natural language service
            $scope.getEmotionAnalysis(data.data);
          });    
      }
  
      /**
       * Call IBM Watson Emotion Analysis
       * @param {object} data - Henry IV data
       */
      function getEmotionAnalysis(data) {
        $http(naturalLanguage).then(function(data){
          console.log(data);
        });
        // $http.post(
        //   naturalLanguage.url,
        //   naturalLanguage.data,
        //   naturalLanguage.headers
        // );
      }
    }
    
  }());
  