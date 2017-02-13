angular.module('cbPagination', [])
    .directive('simplePagination', function(){
        return {
            restrict: 'A',
            templateUrl: 'directives/simplePagination.html',
            replace: true,
            scope: {
                totalItems: '=totalItems',
                itemsPerPage: '=itemsPerPage',
                maxItemsNum: '=maxItemsNum',
                current: '=current',
                changePageNo: '&changePageNo'
            },
            controller: function($scope, $timeout){
                $scope.$watch('current.pageNo', function(newValue, oldValue, scope){
                    $scope.render();
                });
                $scope.render = function(){
                    $scope.pageNos = [];
                    var totalPages = $scope.totalItems / $scope.itemsPerPage;
                    for(var i = 0; i < totalPages; i++){
                        $scope.pageNos.push(i + 1);
                    }
                };
                $scope.prevPage = function(){
                    if($scope.current.pageNo > 1){
                        $scope.changeCurrentPageNo($scope.current.pageNo - 1);
                    }
                };
                $scope.nextPage = function(){
                    if($scope.current.pageNo < $scope.pageNos[$scope.pageNos.length - 1]){
                        $scope.changeCurrentPageNo($scope.current.pageNo + 1);
                    }
                };
                $scope.changeCurrentPageNo = function(pageNo){
                    console.log(pageNo);
                    $scope.current.pageNo = pageNo;
                    $scope.changePageNo();
                };
            },
            link: function(scope, iElement, iAttrs){
                
            }
        };
    });