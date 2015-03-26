dtfApp.controller('MainController', function($scope, $http,$timeout,$location) { 
    // ********* Scope variables *********
    var fetchedData=[],col1,col2,col3,col4,savedData;
    $scope.my_tree = tree = {};
    var getDataFromServer = function(){
      //get data from local storage
      savedData = JSON.parse(localStorage.getItem('savedData'));
      if(!savedData){
        $http.get('models/data.json').success(function(data) {
          populateData(data);
        }); 
      }else{
        populateData(savedData);
      }

      function populateData(data){
        fetchedData = data.slice(0);
        $scope.my_data = fetchedData;
        $scope.prop_names=Object.keys(fetchedData[0].props);
        col1=$scope.prop_names[1];
        col2=$scope.prop_names[2];
        col3=$scope.prop_names[3];
        col4=$scope.prop_names[4];
        $timeout(function() {
          tree.expand_all(); //expand the tree after 1sec
        }, 500);
      }

      $scope.selectedItem={label:"",level:"",index:""};     
    }

    getDataFromServer();

    $scope.jobs=[
        {"label":"Desktop","children":[{}]},
        {"label":"Intergrations","children":[{"label":"Intergration Jobs"}]},
        {"label":"Reporting","children":[{}]},
        {"label":"Administration","children":[{}]}
    ];

    
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

      if(level ==""){
        alert("Please select a row first");
      }else{
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
    }

    //Scope methods
    $scope.refresh=function(){
      $scope.lastRefreshDateTime="Last Refreshed: "+getCurrentDateTime();
      getDataFromServer();
    }

    $scope.save=function(){
      var savedData = JSON.stringify($scope.my_data);
      localStorage.setItem('savedData', savedData);
      $scope.lastSavedDateTime="Last saved: "+getCurrentDateTime();
    }

    $scope.saveAndRun=function(){
      $scope.save();
      gotoFrame('schedule');
    }

    $scope.close=function(){
      gotoFrame('close');
    }

    $scope.importOrganization=function(){
      $scope.toggleSelect(col1);
    }

    $scope.importOrganizationAndUsers=function(){
      $scope.toggleSelect(col1);
      $scope.toggleSelect(col2);
    }

    $scope.obsoleteOrganization=function(){
      $scope.toggleSelect(col3);
    }

    $scope.obsoleteUsers=function(){
      $scope.toggleSelect(col4);
    }

    $scope.jobTreeHandler=function(branch){
      var path = branch.label;
      gotoFrame(path);
      if(path="Intergration Jobs"){
        getDataFromServer();
      }
    }

});

