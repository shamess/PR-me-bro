(function (prmebro, $) {
    "use strict";

    function loadComments(error, comments, pullRequest) {
        var commentCount = comments.length,
            userCommentCount = 0;

        for (var i = 0; i < comments.length; i++) {
            if (comments[i].user.login === prmebro.user.username) {
                userCommentCount++;
            }
        }

        $('#pull-request-' + pullRequest.id + ' .pr-comments').html(userCommentCount + "/" + commentCount + " comments");
    }

    function loadCommentStates() {
        var github = prmebro.github;

        function passPRToLoadComments(pullRequest) {
            return function (error, comments) {
                loadComments(error, comments, pullRequest);
            };
        }

        for (var pullRequestKey in prmebro.pullRequests) {
            if (false === prmebro.pullRequests.hasOwnProperty(pullRequestKey)) {
                continue;
            }

            var pullRequest = prmebro.pullRequests[pullRequestKey];
            github.getRepo(pullRequest.head.repo.owner.login, pullRequest.head.repo.name).getComments(pullRequest.number, passPRToLoadComments(pullRequest));
        }
    }

    prmebro.getEventListener().bind("pullrequests.loaded", loadCommentStates);
}(prmebro, jQuery));
