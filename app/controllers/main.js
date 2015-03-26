dtfApp.controller('MainController', function($scope, $http,$location) { 
    // ********* Scope variables *********
    var fetchedData=[];

    var getDataFromServer = function(){
      $http.get('models/data.json').success(function(data) {
          fetchedData = data.slice(0);
          $scope.my_data = fetchedData;
          $scope.prop_names=Object.keys(fetchedData[0].props);
          var IO=$scope.prop_names[1];
          var IU=$scope.prop_names[2];
          var OO=$scope.prop_names[3];
          var OU=$scope.prop_names[4];
      });      
    }

    getDataFromServer();

    $scope.jobs=[
        {"label":"Desktop","children":[{}]},
        {"label":"Intergrations","children":[{"label":"Intergration Jobs"}]},
        {"label":"Reporting","children":[{}]},
        {"label":"Administration","children":[{}]}
    ];
    
    $scope.selectedItem={label:"",level:"",index:""};
    $scope.lastRefreshDateTime = "";
    $scope.lastSavedDateTime = "";

    // ********* Helper functions ************
    var gotoFrame=function(path){
      $location.path('/'+path);
      $scope.title=path;
    }

    var getCurrentDateTime=function(){
      var currDateStr = ' ';
      var currentDate = new Date(); 
      currDateStr +=currentDate.getFullYear()+ "/";
      currDateStr +=(currentDate.getMonth()+1)+ "/";
      currDateStr +=currentDate.getDate() + "  ";
      currDateStr +=currentDate.getHours() + ":"  ;
      var minutes =currentDate.getMinutes();
      if (minutes < 10) {minutes = "0"+minutes;}
      currDateStr +=minutes;
      return currDateStr;
    }

    $scope.toggleSelect=function(prop){
      console.log("toggleSelect");

      var label=$scope.selectedItem.label;
      var level=$scope.selectedItem.level;
      var index=$scope.selectedItem.index;

      console.log("label:"+label);
      console.log("level:"+level);
      console.log("index:"+index);

      /*
      Use eval eg. change North America, level 3, index 1
      var oldValue=$scope.my_data[0].children[0].children[index].props[prop];
      $scope.my_data[0].children[0].children[index].props[prop]=!oldValue;
      Another way is to update a data
      */

      var findOldValueStr='$scope.my_data[0]';

      for(l=1;l<=level;l++){
          if(level==1){
            findOldValueStr+='.props[prop]';
            break;
          }
          if(l==level-1){
            findOldValueStr+='.children[index].props[prop]';
            break;
          }

          if(l<level){
            findOldValueStr+='.children[0]';
          }
      }        

      var oldValue=eval(findOldValueStr);
      var updateValueStr=findOldValueStr+'=!'+oldValue;
      eval(updateValueStr);
    }

    //Scope methods
    $scope.refresh=function(){
      $scope.lastRefreshDateTime="Last Refreshed: "+getCurrentDateTime();
      getDataFromServer();
    }

    $scope.save=function(){
      $scope.lastSavedDateTime="Last saved: "+getCurrentDateTime();
      fetchedData=$scope.my_data;
    }

    $scope.saveAndRun=function(){
      $scope.lastSavedDateTime="Last saved: "+getCurrentDateTime();
      gotoFrame('schedule');
    }

    $scope.close=function(){
      gotoFrame('close');
    }

    $scope.importOrganization=function(){
      $scope.toggleSelect(IO);
    }

    $scope.importOrganizationAndUsers=function(){
      $scope.toggleSelect(IO);
      $scope.toggleSelect(IU);
    }

    $scope.obsoleteOrganization=function(){
      $scope.toggleSelect(OO);
    }

    $scope.obsoleteUsers=function(){
      $scope.toggleSelect(OU);
    }

    $scope.jobTreeHandler=function(branch){
      var path = branch.label;
      gotoFrame(path);
    }

});

