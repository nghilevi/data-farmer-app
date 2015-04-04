var treeDirective = angular.module('angularBootstrapNavTree', []);

treeDirective.directive('baTree',['$timeout',function($timeout) {
    return {
      restrict: 'E',
      templateUrl: '../views/baTree.html',
      replace: true,
      require:'baTree',
      scope: {
        treeData: '=',
        selectedItem: '=',
        onSelect: '&',
        treeControl: '='
      },
      controller: ['$scope',function ($scope) {

        var for_each_branch = function(f) {
          var do_f, root_branch, _i, _len, _ref, _results;
          do_f = function(branch, level) {
            var child, _i, _len, _ref, _results;
            f(branch, level);
            if (branch.children != null) {
              _ref = branch.children;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                child = _ref[_i];
                _results.push(do_f(child, level + 1));
              }
              return _results;
            }
          };

          var scope = $scope || scope;
          _ref = scope.treeData;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            root_branch = _ref[_i];
            _results.push(do_f(root_branch, 1));
          }
          return _results;
        };

        var get_parent = function(child) {
          var parent;
          parent = void 0;
          if (child.parent_uid) {
            for_each_branch(function(b) {
              if (b.uid === child.parent_uid) {
                return parent = b;
              }
            });
          }
          return parent;
        };
        
        var for_all_ancestors = function(child, fn) {
          var parent;
          parent = get_parent(child);
          if (parent != null) {
            fn(parent);
            return for_all_ancestors(parent, fn);
          }
        };

        var expand_all_parents = function(child) {
          return for_all_ancestors(child, function(b) {
            return b.expanded = true;
          });
        };

        this.selected_branch=null;

        this.select_branch = function(branch,selected_branch) {
          console.log("branch: "+branch);
          console.log("selected_branch: "+selected_branch);

          if (!branch) {
            if (this.selected_branch != null) {
              this.selected_branch.selected = false;
            }
            this.selected_branch = null;
            return;
          }
          if (branch !== this.selected_branch) {
            if (this.selected_branch != null) {
              this.selected_branch.selected = false;
            }
            branch.selected = true;
            this.selected_branch = branch;
            expand_all_parents(branch);
            if (branch.onSelect != null) {
              return $timeout(function() {
                return branch.onSelect(branch);
              });
            } else {
              var scope = $scope || scope;
              if (scope.onSelect != null) {
                return $timeout(function() {
                  return scope.onSelect({
                    branch: branch
                  });
                });
              }
            }
          }
        };

        this.get_parent = get_parent;
        this.for_each_branch = for_each_branch;

      }],
      link: function(scope, element, attrs,baFoldertreeCtrl) {

        var registerIcons = function(attrs,pattern){
          var expandLevel,iconExpand,iconCollapse,iconLeaf;
          if(pattern=="folder"){
            expandLevel='3',
            iconExpand='glyphicon-folder-close',
            iconCollapse='glyphicon-folder-open',
            iconLeaf='glyphicon-folder-close';
          }else if(pattern=="operator"){
            expandLevel='3',
            iconExpand='glyphicon-plus',
            iconCollapse='glyphicon-minus',
            iconLeaf='glyphicon-play';
          }
          if (attrs.iconExpand == null) {
            attrs.iconExpand = 'glyphicon '+iconExpand;
          }
          if (attrs.iconCollapse == null) {
            attrs.iconCollapse = 'glyphicon '+iconCollapse;
          }
          if (attrs.iconLeaf == null) {
            attrs.iconLeaf = 'glyphicon '+iconLeaf;
          }
          if (attrs.expandLevel == null) {
            attrs.expandLevel = expandLevel ;
          }
        } 

        registerIcons(attrs,attrs.pattern);
        
        var for_each_branch    =  baFoldertreeCtrl.for_each_branch;
        var get_parent         =  baFoldertreeCtrl.get_parent;
        var select_branch      =  baFoldertreeCtrl.select_branch;


        var expand_level = parseInt(attrs.expandLevel, 10);
        if (!scope.treeData) {
          //alert('no treeData defined for the tree!');
          return;
        }
        if (scope.treeData.length == null) {
          if (treeData.label != null) {
            scope.treeData = [treeData];
          } else {
            alert('treeData should be an array of root branches');
            return;
          }
        }
        
        var selected_branch = baFoldertreeCtrl.selected_branch;

        scope.user_clicks_branch = function(row) {
          console.log("user_clicks__branch_folder-------------------------------");
          scope.selectedItem.label=row.label;
          scope.selectedItem.level=row.level;
          scope.selectedItem.index=row.index;

          var branch=row.branch;

          if (branch !== selected_branch) {
            return select_branch(branch,selected_branch);
          }
        };


   
        var on_treeData_change = function() {
          var add_branch_to_list, root_branch, _i, _len, _ref, _results;
          for_each_branch(function(b, level) {
            if (!b.uid) {
              return b.uid = "" + Math.random();
            }
          });
          console.log('UIDs are set.');
          for_each_branch(function(b) {
            var child, _i, _len, _ref, _results;
            if (angular.isArray(b.children)) {
              _ref = b.children;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                child = _ref[_i];
                _results.push(child.parent_uid = b.uid);
              }
              return _results;
            }
          });
          scope.tree_rows = [];
          for_each_branch(function(branch) {
            var child, f;
            if (branch.children) {
              if (branch.children.length > 0) {
                f = function(e) {
                  if (typeof e === 'string') {
                    return {
                      label: e,
                      children: []
                    };
                  } else {
                    return e;
                  }
                };
                return branch.children = (function() {
                  var _i, _len, _ref, _results;
                  _ref = branch.children;
                  _results = [];
                  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    child = _ref[_i];
                    _results.push(f(child));
                  }
                  return _results;
                })();
              }
            } else {
              return branch.children = [];
            }
          });
          add_branch_to_list = function(level, branch, visible,_i) {
            var child, child_visible, tree_icon, _i, _len, _ref, _results;
            if (branch.expanded == null) {
              branch.expanded = false;
            }
            if (!branch.children || branch.children.length === 0) {
              tree_icon = attrs.iconLeaf;
            } else {
              if (branch.expanded) {
                tree_icon = attrs.iconCollapse;
              } else {
                tree_icon = attrs.iconExpand;
              }
            }
            scope.tree_rows.push({
              level: level,
              index: _i || 0, //if _i=undefined -> i==0
              branch: branch,
              label: branch.label,
              tree_icon: tree_icon,
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
            _results.push(add_branch_to_list(1, root_branch, true)); //no need for _results?
          }
          
          return _results;
        };
        scope.$watch('treeData', on_treeData_change, true);
        
        var n = scope.treeData.length;
        console.log('num root branches = ' + n);
        for_each_branch(function(b, level) {
          b.level = level;
          return b.expanded = b.level < expand_level;
        });
        if (scope.treeControl != null) {
          if (angular.isObject(scope.treeControl)) {
            var tree = scope.treeControl;
            tree.expand_all = function() {
              console.log("expand!");
              return for_each_branch(function(b, level) {
                return b.expanded = true;
              });
            };
            tree.collapse_all = function() {
              return for_each_branch(function(b, level) {
                return b.expanded = false;
              });
            };
            tree.get_first_branch = function() {
              n = scope.treeData.length;
              if (n > 0) {
                return scope.treeData[0];
              }
            };
            tree.select_first_branch = function() {
              var b;
              b = tree.get_first_branch();
              return tree.select_branch(b);
            };
            tree.get_selected_branch = function() {
              return selected_branch;
            };
            tree.get_parent_branch = function(b) {
              return get_parent(b);
            };
            tree.select_branch = function(b) {
              select_branch(b);
              return b;
            };
            tree.get_children = function(b) {
              return b.children;
            };
            tree.select_parent_branch = function(b) {
              var p;
              if (b == null) {
                b = tree.get_selected_branch();
              }
              if (b != null) {
                p = tree.get_parent_branch(b);
                if (p != null) {
                  tree.select_branch(p);
                  return p;
                }
              }
            };
            tree.add_branch = function(parent, new_branch) {
              if (parent != null) {
                parent.children.push(new_branch);
                parent.expanded = true;
              } else {
                scope.treeData.push(new_branch);
              }
              return new_branch;
            };
            tree.add_root_branch = function(new_branch) {
              tree.add_branch(null, new_branch);
              return new_branch;
            };
            tree.expand_branch = function(b) {
              if (b == null) {
                b = tree.get_selected_branch();
              }
              if (b != null) {
                b.expanded = true;
                return b;
              }
            };
            tree.collapse_branch = function(b) {
              if (b == null) {
                b = selected_branch;
              }
              if (b != null) {
                b.expanded = false;
                return b;
              }
            };
            tree.get_siblings = function(b) {
              var p, siblings;
              if (b == null) {
                b = selected_branch;
              }
              if (b != null) {
                p = tree.get_parent_branch(b);
                if (p) {
                  siblings = p.children;
                } else {
                  siblings = scope.treeData;
                }
                return siblings;
              }
            };
            tree.get_next_sibling = function(b) {
              var i, siblings;
              if (b == null) {
                b = selected_branch;
              }
              if (b != null) {
                siblings = tree.get_siblings(b);
                n = siblings.length;
                i = siblings.indexOf(b);
                if (i < n) {
                  return siblings[i + 1];
                }
              }
            };
            tree.get_prev_sibling = function(b) {
              var i, siblings;
              if (b == null) {
                b = selected_branch;
              }
              siblings = tree.get_siblings(b);
              n = siblings.length;
              i = siblings.indexOf(b);
              if (i > 0) {
                return siblings[i - 1];
              }
            };
            tree.select_next_sibling = function(b) {
              var next;
              if (b == null) {
                b = selected_branch;
              }
              if (b != null) {
                next = tree.get_next_sibling(b);
                if (next != null) {
                  return tree.select_branch(next);
                }
              }
            };
            tree.select_prev_sibling = function(b) {
              var prev;
              if (b == null) {
                b = selected_branch;
              }
              if (b != null) {
                prev = tree.get_prev_sibling(b);
                if (prev != null) {
                  return tree.select_branch(prev);
                }
              }
            };
            tree.get_first_child = function(b) {
              var _ref;
              if (b == null) {
                b = selected_branch;
              }
              if (b != null) {
                if (((_ref = b.children) != null ? _ref.length : void 0) > 0) {
                  return b.children[0];
                }
              }
            };
            tree.get_closest_ancestor_next_sibling = function(b) {
              var next, parent;
              next = tree.get_next_sibling(b);
              if (next != null) {
                return next;
              } else {
                parent = tree.get_parent_branch(b);
                return tree.get_closest_ancestor_next_sibling(parent);
              }
            };
            tree.get_next_branch = function(b) {
              var next;
              if (b == null) {
                b = selected_branch;
              }
              if (b != null) {
                next = tree.get_first_child(b);
                if (next != null) {
                  return next;
                } else {
                  next = tree.get_closest_ancestor_next_sibling(b);
                  return next;
                }
              }
            };
            tree.select_next_branch = function(b) {
              var next;
              if (b == null) {
                b = selected_branch;
              }
              if (b != null) {
                next = tree.get_next_branch(b);
                if (next != null) {
                  tree.select_branch(next);
                  return next;
                }
              }
            };
            tree.last_descendant = function(b) {
              var last_child;
              if (b == null) {
                debugger;
              }
              n = b.children.length;
              if (n === 0) {
                return b;
              } else {
                last_child = b.children[n - 1];
                return tree.last_descendant(last_child);
              }
            };
            tree.get_prev_branch = function(b) {
              var parent, prev_sibling;
              if (b == null) {
                b = selected_branch;
              }
              if (b != null) {
                prev_sibling = tree.get_prev_sibling(b);
                if (prev_sibling != null) {
                  return tree.last_descendant(prev_sibling);
                } else {
                  parent = tree.get_parent_branch(b);
                  return parent;
                }
              }
            };
            return tree.select_prev_branch = function(b) {
              var prev;
              if (b == null) {
                b = selected_branch;
              }
              if (b != null) {
                prev = tree.get_prev_branch(b);
                if (prev != null) {
                  tree.select_branch(prev);
                  return prev;
                }
              }
            };
          }
        }
      }
    };
}]);



