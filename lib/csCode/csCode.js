var csTutorial = {};

angular.module('csTutorial')
    .config([
        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
        function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
            'use strict';
            csTutorial.controller = $controllerProvider.register;
            csTutorial.directive = $compileProvider.directive;
            csTutorial.filter = $filterProvider.register;
            csTutorial.service = $provide.service;
        }
    ]);



angular.module('csTutorial')
    .directive('csCode', [
        '$compile', '$http',
        function ($compile, $http) {
            'use strict';
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/lib/csCode/csCode.html',
                scope: {
                    codeOption: '=',
                    includeFiles: '=',
                    previewPage: '=',
                    defaultPage: '='
                },
                link: function (scope, element) {
                    scope.code = scope.codeOption || {
                        files: scope.includeFiles,
                        previewPage: scope.previewPage,
                        defaultPage: scope.defaultPage || 0
                    };
                    var withPreview = scope.code.previewPage === undefined ? 0 : 1;
                    var filePreview = {
                        name: 'Preview',
                        loaded: false
                    };
                    scope.files = withPreview ? [filePreview] : [];
                    scope.selectFile = selectFile;
                    scope.files = scope.files.concat(
                        scope.code.files.map(function (path) {
                            var file = {
                                name: path.lastAfter('/'),
                                suffix: path.lastAfter('.'),
                                path: path,
                                content: ''
                            };
                            $http.get(file.path).success(function (data) {
                                fileComplete(file, data);
                            });
                            return file;
                        })
                    );
                    selectFile(scope.files[scope.code.defaultPage + withPreview]);

                    var fileToLoad = scope.code.files.length;
                    function fileComplete(file, data) {
                        fileToLoad--;
                        file.content = data;
                        if (fileToLoad === 0) {
                            if (filePreview.touched) {
                                loadPreview();
                            }
                        }
                    }

                    function selectFile(file) {
                        file.touched = true;
                        scope.code.fileActive = file;
                        if (file === filePreview) {
                            if (fileToLoad === 0) {
                                loadPreview();
                            }
                        }
                    }

                    function loadPreview() {
                        if (!withPreview || filePreview.loaded) {
                            return;
                        }
                        element.find('.code-script').append(
                            '<div>' +
                                scope.files.filter(function (file) {
                                    return file.suffix === 'js';
                                }).map(function (file) {
                                    return '<script>' + file.content + '</script>';
                                }).join('') +
                                '</div>'
                        );
                        var preview = element.find('.code-preview');
                        preview.append(scope.files[scope.code.previewPage + withPreview].content);
                        $compile(preview)(scope);
                        filePreview.loaded = true;
                    }

                }
            }
        }
    ]);

angular.loaded = true;