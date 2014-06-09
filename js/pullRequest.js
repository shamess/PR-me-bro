define(['prmebro', 'jquery', 'dust-full', 'eventListener'], function (prmebro, $, templateRenderer, eventListener) {
    "use strict";

    function cachePullRequests(pullRequests) {
        prmebro.pullRequests = {};

        for (var i = 0; i < pullRequests.length; i++) {
            prmebro.pullRequests[pullRequests[i].issue_url] = pullRequests[i];
        }
    }

    function loadPullRequests() {
        var pullRequests = [],
            github = prmebro.github,
            numberRequestsPending = 0;

        function addPullRequestsToList(error, newPullRequests) {
            pullRequests = pullRequests.concat(newPullRequests);

            numberRequestsPending--;
        }

        numberRequestsPending++;
        github.getUser().subscriptions(function (error, repositories) {
            for (var i = 0; i < repositories.length; i++) {
                numberRequestsPending++;
                github.getRepo(repositories[i].owner.login, repositories[i].name).listPulls('open', addPullRequestsToList);
            }

            numberRequestsPending--;
        });

        var anyPendingRequestsLeftChecker = setInterval(function () {
            if (numberRequestsPending === 0) {
                clearInterval(anyPendingRequestsLeftChecker);

                cachePullRequests(pullRequests);
                displayPullRequests(pullRequests);
            }
        }, 10);
    }

    function displayPullRequests(pullRequests) {
        var templateSource = $('#pullrequest-list-view').html(),
            compiledTemplate = dust.compile(templateSource, "pull-request-list-view");

        dust.loadSource(compiledTemplate);
        dust.render("pull-request-list-view", {pullRequests: pullRequests}, function (error, output) {
            $('#container').html(output);

            eventListener.trigger("pullrequests.loaded");
        });
    }

    eventListener.bind("user.loggedin", loadPullRequests);
});
