angular.module('dtfApp')
  .controller('MainController', function($scope, $timeout) { 
    //Raw data
    var org_data = [
      {
        "label": 'BA-Group',
        "props":{"EA":true, "IO":true, "IU":false, "MOO":false, "MUO":false},
        "children": [
          {
            "label": 'BA-Group Development',
            "props":{"EA":true, "IO":true, "IU":false, "MOO":false, "MUO":true},
            "children": [
              {
                "label": 'North America',
                "props":{"EA":true, "IO":true, "IU":false, "MOO":false, "MUO":false},
                "children": [
                  {
                    "label": 'North America SubOrg1',
                    "props":{"EA":true, "IO":true, "IU":true, "MOO":false, "MUO":false}
                  },
                  {
                    "label": 'North America SubOrg2',
                    "props":{"EA":true, "IO":false, "IU":false, "MOO":true, "MUO":false}
                  }

                ]
              },
              {"label":"Functions","props":{"EA":true, "IO":true, "IU":false, "MOO":false, "MUO":false}},
              {"label":"Europe&Latin America","props":{"EA":true, "IO":false, "IU":false, "MOO":false, "MUO":true}},
              {"label":"HR Human Resources","props":{"EA":true, "IO":false, "IU":false, "MOO":false, "MUO":true}},
              {"label":"Org Unit for Level 2 Testing","props":{"EA":false, "IO":false, "IU":false, "MOO":false, "MUO":false}}
            ]
          }
        ]
      }
    ];
    
    //Helper functions
    var getCurrentDateTime=function(){
      var currDateStr = ' ';
      var currentDate = new Date(); 
      currDateStr +=currentDate.getFullYear()+ "/";
      currDateStr +=(currentDate.getMonth()+1)+ "/";
      currDateStr +=currentDate.getDate() + "  ";
      currDateStr +=currentDate.getHours() + ":"  ;
      currDateStr +=currentDate.getMinutes();
      return currDateStr;
    }
    var processData = function(data){
      return data[0].props;
    }

    //Scope methods
    $scope.refresh=function(){
      document.getElementById("last-refresh-date").innerHTML="Last Refreshed: "+getCurrentDateTime();
    }

    $scope.save=function(){
      document.getElementById("last-saved").innerHTML="Last saved: "+getCurrentDateTime();
    }

    $scope.saveAndRun=function(){
      //TODO
      document.getElementById("last-saved").innerHTML="Last saved: "+getCurrentDateTime();
    }

    $scope.close=function(){
      //TODO
    }

    //Processed data
    $scope.prop_names=Object.keys(processData(org_data));

    $scope.menus=[
        {"label":"Desktop"},
        {"label":"Intergrations","children":[{"label":"Intergration Jobs"}]},
        {"label":"Reporting"},
        {"label":"Administration"}
    ];

    $scope.my_data = org_data;

});