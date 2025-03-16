exports.context = function(server, path) {
    if (!server) throw new Error('A restify server object must be provided');

    const context = path ? `${path}/serverinfo` : '/serverinfo';

    server.get(context, (req, res, next) => {
        const serverInfo = {
            name: 'Todo API Server',
            version: '1.0.0',
            nodeVersion: process.version,
            platform: process.platform,
            uptime: process.uptime().toFixed(2) + ' seconds'
        };
        res.json(serverInfo);
        next();
    });
};
