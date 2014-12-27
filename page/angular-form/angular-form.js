csTutorial.controller('AngularFormController', [
    '$scope',
    function ($scope) {
        $scope.info = {
            name: '',
            passwordFirst: '',
            passwordTwice: ''
        };
        $scope.$watch('form', function () {
            $scope.form.passwordTwice.$validators.validateSame = function (modelValue) {
                return modelValue === $scope.info.passwordFirst;
            };
            console.log($scope.form);
        });
    }
]);