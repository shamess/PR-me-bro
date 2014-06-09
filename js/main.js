requirejs.config({
    shim: {
        'base64': {
            exports: 'Base64'
        },
        'dust-full': {
            exports: 'dust'
        }
    }
});

requirejs(['login', 'pullRequest', 'commentState'], function () {
});
