(function (prmebro) {
    "use strict";

    var eventListener = prmebro.getEventListener();

    QUnit.asyncTest("bound events actually get triggered", function (assert) {
        eventListener.bind("someevent", function () {
            assert.ok(true, "Bound event triggered fine");
            QUnit.start();
        });

        eventListener.trigger("someevent");
    });

    test("ensure that getEventListener is always same instance", function (assert) {
        var listener1 = prmebro.getEventListener();
        listener1.fooBar = "baz";

        var listener2 = prmebro.getEventListener();

        assert.equal(listener1, listener2);
    });
}(prmebro));
