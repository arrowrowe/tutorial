csTutorial.filter('tqShort', function () {
    'use strict';
    return function (text, length) {
        return text.length > length ?
            (text.substr(0, length - 3) + '...') :
            text;
    }
});