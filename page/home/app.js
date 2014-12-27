
angular.module('csTutorial')
    .controller('HomeController', [
        '$scope',
        function ($scope) {
            'use strict';
            $scope.pages = [
                {
                    title: '阅读',
                    name: 'read'
                },
                {
                    title: 'directive 基本属性',
                    name: 'intro'
                },
                {
                    title: 'directive 实例: tqSlider',
                    name: 'sample-tqSlider'
                },
                {
                    title: 'directive 实例: tqChart',
                    name: 'sample-tqChart'
                },
                {
                    title: 'directive 实例: tqGrid',
                    name: 'sample-tqGrid'
                },
                {
                    title: 'Angular 表单',
                    name: 'angular-form'
                },
                {
                    title: 'service 实例: Dialog, Notify',
                    name: 'service'
                },
                {
                    title: 'filter',
                    name: 'filter'
                },
                {
                    title: '一些细节...',
                    name: 'some-detail'
                }
            ];
            $scope.jumpTo = function (place) {
                window.location.href = place;
            }
        }
    ]);