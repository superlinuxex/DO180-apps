var Sequelize = require("sequelize");
var mysql2 = require("mysql2");

let sequelize;
let Item;

module.exports.connect = function(params, callback) {
    sequelize = new Sequelize(
        params.dbname, params.username, params.password,
        Object.assign({}, params.params, { dialect: 'mysql', dialectModule: mysql2 })
    );

    Item = sequelize.define('Item', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        },
        done: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    sequelize.authenticate()
        .then(() => callback())
        .catch(err => callback(err));
}

exports.disconnect = function(callback) {
    if (sequelize) {
        sequelize.close().then(() => callback()).catch(err => callback(err));
    } else {
        callback();
    }
}

exports.create = function(description, done, callback) {
    Item.create({
        description: description,
        done: !!done
    }).then(item => {
        callback(null, item);
    }).catch(err => {
        callback(err);
    });
}

exports.update = function(key, description, done, callback) {
    Item.findOne({ where: { id: key } }).then(item => {
        if (!item) {
            callback(new Error("Nothing found for key " + key));
        } else {
            item.update({
                description: description,
                done: !!done
            }).then(() => {
                callback(null, item);
            }).catch(err => {
                callback(err);
            });
        }
    }).catch(err => {
        callback(err);
    });
}

exports.read = function(key, callback) {
    Item.findOne({ where: { id: key } }).then(item => {
        if (!item) {
            callback(new Error("Nothing found for key " + key));
        } else {
            callback(null, item);
        }
    }).catch(err => {
        callback(err);
    });
}

exports.destroy = function(key, callback) {
    Item.findOne({ where: { id: key } }).then(item => {
        if (!item) {
            callback(new Error("Nothing found for key " + key));
        } else {
            item.destroy().then(() => {
                callback(null, item);
            }).catch(err => {
                callback(err);
            });
        }
    }).catch(err => {
        callback(err);
    });
}

exports.countAll = function(callback) {
    Item.count().then(count => {
        callback(null, count);
    }).catch(err => {
        callback(err);
    });
}

exports.listAll = function(page, sortField, sortDirection, callback) {
    Item.findAll({
        offset: 10 * (page - 1),
        limit: 10,
        order: [[sortField, sortDirection]]
    }).then(items => {
        callback(null, items);
    }).catch(err => {
        callback(err);
    });
}
