csTutorial.controller('IntroController', [
    '$scope',
    function ($scope) {
        'use strict';
        $scope.welcome = 'Hello controller!';
        $scope.text = 'Test Button';
        $scope.alert = function () {
            alert('hi!');
        };
    }
]);

csTutorial.directive('sampleDirective', [
    function () {
        'use strict';
        return {
            restrict: 'E',  // 自定义时, 以 tag/attr/class 为标识
            replace: true,  // 以 tag 为标识时, 是否保留原来的 tag
            templateUrl: '/page/intro/sampleDirective.html',
            scope: {
                buttonName: '=',    // 双向绑定
                welcome: '@',       // 获取字符串
                test: '&'           // 得到函数引用
            }
            // link: function (scope, element, attrs, controllers) {},
            // controller: function (scope) {},
            // controllerAs: '',
        }
    }
]);