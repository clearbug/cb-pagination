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

                $scope.pager.maxSize = angular.isDefined($scope.pager.maxSize) ? $scope.pager.maxSize : 10;

                $scope.$watch('pager.total', function(newValue, oldValue, scope){
                    $scope.render();
                });

                $scope.render = function(){
                    $scope.pageNos = [];
                    var totalPages = Math.ceil($scope.pager.total / $scope.pager.pageSize);
                    if(totalPages > 0 && ($scope.pager.pageNo < 1 || $scope.pager.pageNo > totalPages)){
                        $scope.pager.pageNo = 1;
                    }

                    var startPage = 1;
                    var endPage = totalPages;
                    var isMaxSized = $scope.pager.maxSize < totalPages;
                    if(isMaxSized){
                        // Current page is displayed in the middle of the visible ones
                        startPage = Math.max($scope.pager.pageNo - Math.floor($scope.pager.maxSize / 2), 1);
                        endPage = startPage + $scope.pager.maxSize - 1;

                        // Adjust if limit is exceeded
                        if(endPage > totalPages){
                            endPage = totalPages;
                            startPage = endPage - $scope.pager.maxSize + 1;
                        }
                    }
                    for(var i = startPage; i <= endPage; i++){
                        $scope.pageNos.push(i);
                    }
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
                        $scope.render();
                    }
                };

                $scope.render();
            },
            link: function(scope, iElement, iAttrs){
                
            }
        };
    });