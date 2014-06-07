(function (prmebro, $) {
    "use strict";

    function displayPullRequests() {
        $('.login,.fyi').remove();

        $("<p>Well, isn't this nice.</p>").appendTo('body');
    }

    prmebro.getEventListener().bind("user.loggedin", displayPullRequests);
}(prmebro, jQuery));
