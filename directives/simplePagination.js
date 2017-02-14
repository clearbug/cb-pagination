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

                    $scope.pages = [];
                    
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

                    for(var number = startPage; number <= endPage; number++){
                        var page = makePage(number, number, number === $scope.pager.pageNo);
                        $scope.pages.push(page);
                    }

                    if(isMaxSized){
                        if(startPage > 1){
                            var previousPageSet = makePage(startPage - 1, '...', false);
                            $scope.pages.unshift(previousPageSet);
                        }
                        if(endPage < totalPages){
                            var nextPageSet = makePage(endPage + 1, '...', false);
                            $scope.pages.push(nextPageSet);
                        }
                    }

                    if($scope.pages[0].text !== 1){
                        $scope.pages.unshift(makePage(1, 1, false));
                    }
                    if($scope.pages[$scope.pages.length -1].text !== totalPages){
                        $scope.pages.push(makePage(totalPages, totalPages, false));
                    }
                };

                $scope.prevPage = function(){
                    if($scope.pager.pageNo > 1){
                        $scope.changeCurrentPageNo($scope.pager.pageNo - 1);
                    }
                };

                $scope.nextPage = function(){
                    if($scope.pager.pageNo < $scope.pages[$scope.pages.length - 1].number){
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

                // Create page object used in template
                function makePage(number, text, isActive){
                    return {
                        number: number,
                        text: text,
                        active: isActive
                    };
                }
            },
            link: function(scope, iElement, iAttrs){
                
            }
        };
    });