angular.module('csTutorial', ['ui.bootstrap']);

angular.module('csTutorial')
    .directive('siteNav', [
        function () {
            'use strict';
            return {
                restrict: 'E',
                replace: true,
                templateUrl: './page/base/siteNav.html'
            }
        }
    ]);

String.prototype.lastAfter = function (needle) {
    return this.slice(this.lastIndexOf(needle) + 1);
};