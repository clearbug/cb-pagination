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
                $scope.$watch('pager.currentPageNo', function(newValue, oldValue, scope){
                    $scope.render();
                });
                $scope.render = function(){
                    $scope.pageNos = [];
                    var totalPages = $scope.pager.totalItems / $scope.pager.itemsPerPage;
                    for(var i = 0; i < totalPages; i++){
                        $scope.pageNos.push(i + 1);
                    }
                };
                $scope.prevPage = function(){
                    if($scope.pager.currentPageNo > 1){
                        $scope.changeCurrentPageNo($scope.pager.currentPageNo - 1);
                    }
                };
                $scope.nextPage = function(){
                    if($scope.pager.currentPageNo < $scope.pageNos[$scope.pageNos.length - 1]){
                        $scope.changeCurrentPageNo($scope.pager.currentPageNo + 1);
                    }
                };
                $scope.changeCurrentPageNo = function(pageNo){
                    console.log(pageNo);
                    $scope.pager.currentPageNo = pageNo;
                    $scope.pager.changePageNo();
                };
            },
            link: function(scope, iElement, iAttrs){
                
            }
        };
    });