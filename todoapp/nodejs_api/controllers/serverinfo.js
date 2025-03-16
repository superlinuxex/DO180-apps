const os = require('os');
const pkg = require('../package.json');

exports.context = function (server, path) {
    if (!server) {
        throw new Error('You must provide a restify server instance');
    }

    let context = "/serverinfo";
    if (path) {
        context = path + context;
    }

    server.get(context, this.info);
};

exports.info = function (req, res, next) {
    const info = {
        appName: pkg.name,
        version: pkg.version,
        description: pkg.description || 'ToDo API service',
        hostname: os.hostname(),
        platform: os.platform(),
        uptime: `${os.uptime()} seconds`,
        memory: {
            total: `${(os.totalmem() / (1024 ** 2)).toFixed(2)} MB`,
            free: `${(os.freemem() / (1024 ** 2)).toFixed(2)} MB`
        }
    };
    res.json(info);
    return next();
};

