app.directive('checkboxtree', [
  '$timeout', function($timeout) {
    return {
      restrict: 'E',
      templateUrl: '../views/checkbox.html',
      replace: true,
      scope: {
        treeData: '=',
        column:'=',
        toggleSelect:'=',
        selectedItem: '=' //2 way data binding
      },
      link: function(scope, element, attrs) {
        


        var for_all_ancestors,n, on_treeData_change, select_branch, selected_branch, tree;

        selected_branch = null;


        scope.user_clicks_branch = function(row) {
          console.log("user_clicks__branch_checkbox-------------------------------");
          scope.selectedItem.label=row.label;
          scope.selectedItem.level=row.level+1;
          scope.selectedItem.index=row.index;
          scope.toggleSelect([scope.column]);
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