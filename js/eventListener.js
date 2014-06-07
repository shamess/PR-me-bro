(function (prmebro) {
    "use strict";

    var eventListener = function () {
        var events = {},
            bind,
            trigger;

        bind = function (eventName, callback) {
            if (typeof events[eventName] !== "object") {
                events[eventName] = [];
            }

            events[eventName].push(callback);
        };

        trigger = function (eventName) {
            if (typeof events[eventName] !== "object") {
                return;
            }

            for (var i = 0; i < events[eventName].length; i++) {
                events[eventName][i]();
            }
        };

        return {
            trigger: trigger,
            bind: bind
        };
    }();

    prmebro.getEventListener = function () {
        return eventListener;
    };
}(prmebro));
