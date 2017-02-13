angular.module('cbPagination', [])
    .directive('simplePagination', function(){
        return {
            restrict: 'A',
            templateUrl: 'directives/simplePagination.html',
            replace: true,
            scope: {
                pager: '=pager'
            },
            controller: function($scope, $timeout){
                /*$scope.$watch('pager.pageNo', function(newValue, oldValue, scope){
                    $scope.render();
                });*/

                $scope.render = function(){
                    $scope.pageNos = [];
                    var totalPages = $scope.pager.total / $scope.pager.pageSize;
                    for(var i = 0; i < totalPages; i++){
                        $scope.pageNos.push(i + 1);
                    }
                    // TODO: 处理页码显示过多问题
                };

                $scope.prevPage = function(){
                    if($scope.pager.pageNo > 1){
                        $scope.changeCurrentPageNo($scope.pager.pageNo - 1);
                    }
                };

                $scope.nextPage = function(){
                    if($scope.pager.pageNo < $scope.pageNos[$scope.pageNos.length - 1]){
                        $scope.changeCurrentPageNo($scope.pager.pageNo + 1);
                    }
                };

                $scope.changeCurrentPageNo = function(pageNo){
                    if($scope.pager.pageNo !== pageNo){
                        $scope.pager.pageNo = pageNo;
                        $scope.pager.changePageNo();
                    }
                };

                $scope.render();
            },
            link: function(scope, iElement, iAttrs){
                
            }
        };
    });