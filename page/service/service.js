csTutorial.controller('NotifyTestController', [
    '$scope', 'Notify',
    function ($scope, Notify) {
        'use strict';
        $scope.msg = {
            title: 'Title',
            body: 'body'
        };
        $scope.pop = function () {
            Notify.notify($scope.msg.title, $scope.msg.body);
        };
    }
]);

csTutorial.service('Notify', [
    function () {
        'use strict';
        return {init: init, notify: notify};

        function init(callBack) {
            if (!('Notification' in window)) {
                console.log('Webkit notification not supported.')
            } else if (Notification.permission === 'granted') {
                callBack && callBack();
            } else if (Notification.permission !== 'denied') {
                console.log('Webkit notification requiring permission.');
                Notification.requestPermission(function (permission) {
                    if (permission === 'granted') {
                        console.log('Webkit notification permission confirmed.');
                        callBack && callBack();
                    } else {
                        console.log('Webkit notification permission refused.');
                    }
                });
            }
        }

        function notify(title, body, icon) {
            init(function () {
                _notify(title, body, icon);
            });
        }

        function _notify(title, body, icon) {
            return new Notification(title, {
                icon: icon || '/image/notify.png',
                body: body
            });
        }
    }
]);