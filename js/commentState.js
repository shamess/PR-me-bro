(function (prmebro, $, dust) {
    "use strict";

    function bindPopoverAction($commentSection) {
        $commentSection.hover(function () {
            $('.pop-over', $commentSection).show();
        }, function() {
            $('.pop-over', $commentSection).hide();
        });
    }

    function displayComment(pullRequest, commentCount, userCommentCount) {
        var templateSource = $('#pullrequest-comment-state').html(),
            compiledTemplate = dust.compile(templateSource, "pull-request-comment-state");

        dust.loadSource(compiledTemplate);
        dust.render("pull-request-comment-state", {commentCount: commentCount, userCommentCount: userCommentCount}, function (error, output) {
            $('#pull-request-' + pullRequest.id + ' .pr-comment').html(output);

            bindPopoverAction($('#pull-request-' + pullRequest.id + ' .pr-comment'));
        });
    }

    function aggregateCommentData(error, comments, pullRequest) {
        var commentCount = comments.length,
            userCommentCount = 0;

        for (var i = 0; i < comments.length; i++) {
            if (comments[i].user.login === prmebro.user.username) {
                userCommentCount++;
            }
        }

        displayComment(pullRequest, commentCount, userCommentCount);
    }

    function loadCommentStates() {
        var github = prmebro.github;

        function passPRToLoadAgregator(pullRequest) {
            return function (error, comments) {
                aggregateCommentData(error, comments, pullRequest);
            };
        }

        for (var pullRequestKey in prmebro.pullRequests) {
            if (false === prmebro.pullRequests.hasOwnProperty(pullRequestKey)) {
                continue;
            }

            var pullRequest = prmebro.pullRequests[pullRequestKey];
            github.getRepo(pullRequest.head.repo.owner.login, pullRequest.head.repo.name).getComments(pullRequest.number, passPRToLoadAgregator(pullRequest));
        }
    }

    prmebro.getEventListener().bind("pullrequests.loaded", loadCommentStates);
}(prmebro, jQuery, dust));
