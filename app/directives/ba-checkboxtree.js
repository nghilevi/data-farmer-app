app.directive('baCheckboxtree', [
  '$timeout', function($timeout) {
    return {
      restrict: 'E',
      templateUrl: '../views/checkbox.html',
      replace: true,
      scope: {
        treeData: '=',
        selectedItem: '=', 
        column:'=',
        toggleSelect:'='
      },
      link: function(scope, element, attrs) {
        
        var on_treeData_change, select_branch, 
          selected_branch = null,
          selected_column = null;

        select_branch = function(branch) {
          if (selected_branch != null) {
            selected_branch.selected = false;
          }

          if (!branch) {
            if (selected_branch != null) {
              selected_branch.selected = false;
            }
            selected_branch = null;
            return;
          }


          branch.selected = true;
          selected_branch = branch;
          selected_column = scope.column;

        };
        
        scope.user_clicks_branch = function(row) {
          console.log("user_clicks__branch_checkbox-------------------------------");
          var branch=row.branch;
          scope.selectedItem.label=branch.label;
          scope.selectedItem.level=row.level+1;
          scope.selectedItem.index=row.index;
          scope.selectedItem.prop=scope.column;

          //If the click branch!=previous selected branch
          if (branch !== selected_branch) {
            select_branch(branch);
          }

          $timeout(function(){
            scope.toggleSelect(scope.column)
          });

        };

        scope.tree_rows = [];
        on_treeData_change = function() {
          console.log('on_treeData_change!!!');

          var add_branch_to_list, root_branch, _i, _len, _ref, _results;

          scope.tree_rows = [];

          add_branch_to_list = function(level, branch, visible,_i) { //remember to pass back _i so _i is updated again
            var child, child_visible, _i, _len, _ref, _results;

            scope.tree_rows.push({
              branch: branch,
              index: _i || 0, //if _i=undefined -> i==0
              level: level,
              label: branch.props[scope.column],
              visible: visible
            });


            if (branch.children != null) {
              _ref = branch.children;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                child = _ref[_i];
                child_visible = visible && branch.expanded;
                _results.push(add_branch_to_list(level + 1, child, child_visible,_i));
              }
              return _results;
            }
          };

          _ref = scope.treeData;
          _results = [];

          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            root_branch = _ref[_i];
            _results.push(add_branch_to_list(0, root_branch, true));
          }
          
          return _results;
        };

        scope.$watch('treeData', on_treeData_change, true);

      }
    };
  }
]);