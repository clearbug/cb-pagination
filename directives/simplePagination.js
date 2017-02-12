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
                currentPageNo: '=currentPageNo',
                changePageNo: '&changePageNo'
            },
            controller: function($scope){
                $scope.$watch('currentPageNo', function(newValue, oldValue, scope){
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
                    if($scope.currentPageNo > 1){
                        $scope.changeCurrentPageNo($scope.currentPageNo - 1);
                    }
                };
                $scope.nextPage = function(){
                    if($scope.currentPageNo < $scope.pageNos[$scope.pageNos.length - 1]){
                        $scope.changeCurrentPageNo($scope.currentPageNo + 1);
                    }
                };
                $scope.changeCurrentPageNo = function(pageNo){
                    debugger
                    console.log(pageNo);
                    $scope.currentPageNo = pageNo;
                    $scope.changePageNo();
                };
            },
            link: function(scope, iElement, iAttrs){
                
            }
        };
    });