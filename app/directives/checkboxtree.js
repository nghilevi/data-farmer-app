app.directive('checkboxtree', [
  '$timeout', function($timeout) {
    return {
      restrict: 'E',
      template: "<ul class=\"nav nav-list nav-pills nav-stacked abn-tree\">\n  <li ng-repeat=\"row in tree_rows | filter:{visible:true} track by row.branch.uid\" ng-animate=\"'abn-tree-animate'\" ng-class=\"(row.branch.selected ? ' active':'')\" class=\"abn-tree-row\">\n    <a>\n<span class=\"indented tree-label\"><input  ng-click=\"user_clicks_branch(row)\" type='checkbox' ng-model='row.label'  /></span>\n    </a>\n  </li>\n</ul>",
      replace: true,
      scope: {
        treeData: '=',
        column:'='
      },
      link: function(scope, element, attrs) {
        
        console.dir('scope'+scope);
        console.dir(scope);
        console.dir('element'+element);
        console.dir(element);
        console.dir('attrs'+attrs);
        console.dir(attrs);

        var for_all_ancestors,n, on_treeData_change, select_branch, selected_branch, tree;

        selected_branch = null;


        scope.user_clicks_branch = function(row) {
          var oldValue=scope.tree_rows[row.index].branch.props[scope.column];
          scope.tree_rows[row.index].branch.props[scope.column]=!oldValue;
        };

        scope.tree_rows = [];
        on_treeData_change = function() {
          console.log('on_treeData_change!!!');

          var add_branch_to_list, root_branch, _i, _len, _ref, _results;

          scope.tree_rows = [];

          add_branch_to_list = function(level, branch, visible) {
            var child, child_visible, _i, _len, _ref, _results;
            
            // scope.tree_rows.push({
            //   level: level,
            //   branch: branch,
            //   label: branch.props[scope.column],
            //   visible: visible
            // });

            scope.tree_rows.push({
              branch: branch,
              index: level,
              label: branch.props[scope.column],
              visible: visible
            });


            if (branch.children != null) {
              _ref = branch.children;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                child = _ref[_i];
                child_visible = visible && branch.expanded;
                _results.push(add_branch_to_list(level + 1, child, child_visible));
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
          
          console.log("_results:");
          console.log(_results);
          return _results;
        };

        scope.$watch('treeData', on_treeData_change, true);

      }
    };
  }
]);