define(['jquery', 'prmebro', 'github', 'eventListener'], function ($, prmebro, Github, eventListener) {
    "use strict";

    function attemptLogin(github, callback) {
        github.getUser().orgs(function (error, response) {
            callback(typeof response === "object");
        });
    }

    $(function() {
        $('button[type="submit"]').click(function (event) {
            event.preventDefault();

            prmebro.user.username = $('#username').val();
            prmebro.user.password = $('#password').val();

            prmebro.github = Github.getNewGithub({
                username: prmebro.user.username,
                password: prmebro.user.password,
                auth: "basic"
            });

            attemptLogin(prmebro.github, function (loginSuccess) {
                if (loginSuccess) {
                    prmebro.user.validated = true;
                    $('.password button').text("loading...");
                    eventListener.trigger("user.loggedin");
                } else {
                    $('.password button').text("try again");
                }
            });
        });
    });
});
