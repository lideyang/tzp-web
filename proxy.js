module.exports = {
    '/api/*': {
        target: 'http://127.0.0.1:2618',
        secure: false
    },
    '*': {
        target: 'http://127.0.0.1:1983',
        secure: false
    }
};



