'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "organizations", deps: []
 * createTable "parties", deps: []
 * createTable "events", deps: [organizations]
 * createTable "users", deps: [events, parties]
 * createTable "statements", deps: [events, users]
 * createTable "factchecks", deps: [users, statements, users]
 *
 **/

var info = {
    "revision": 1,
    "name": "es6-models",
    "created": "2019-05-15T11:21:42.980Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "organizations",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "validate": {
                        "len": [1, 64]
                    },
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "parties",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "validate": {
                        "len": [1, 64]
                    },
                    "allowNull": false
                },
                "abbreviation": {
                    "type": Sequelize.STRING,
                    "field": "abbreviation",
                    "validate": {
                        "len": [1, 64],
                        "isAlpha": true
                    },
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "events",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "validate": {
                        "len": [1, 64]
                    },
                    "allowNull": false
                },
                "date": {
                    "type": Sequelize.DATE,
                    "field": "date",
                    "defaultValue": 1557919302937
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "organizationId": {
                    "type": Sequelize.INTEGER,
                    "field": "organizationId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "organizations",
                        "key": "id"
                    },
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "username": {
                    "type": Sequelize.STRING,
                    "field": "username",
                    "validate": {
                        "len": [1, 64],
                        "isAlphanumeric": true
                    },
                    "allowNull": false
                },
                "firstName": {
                    "type": Sequelize.STRING,
                    "field": "firstName",
                    "validate": {
                        "len": [1, 64],
                        "isAlpha": true
                    },
                    "allowNull": false
                },
                "lastName": {
                    "type": Sequelize.STRING,
                    "field": "lastName",
                    "validate": {
                        "len": [1, 64],
                        "isAlpha": true
                    },
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "validate": {
                        "isEmail": true,
                        "len": [1, 64]
                    },
                    "unique": true,
                    "allowNull": false
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "eventId": {
                    "type": Sequelize.INTEGER,
                    "field": "eventId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "events",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "partyId": {
                    "type": Sequelize.INTEGER,
                    "field": "partyId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "parties",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "statements",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "content": {
                    "type": Sequelize.TEXT,
                    "field": "content",
                    "validate": {
                        "len": [10, 256]
                    },
                    "allowNull": false
                },
                "date": {
                    "type": Sequelize.DATE,
                    "field": "date",
                    "defaultValue": 1557919302944
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "eventId": {
                    "type": Sequelize.INTEGER,
                    "field": "eventId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "events",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "politicianId": {
                    "type": Sequelize.INTEGER,
                    "field": "politicianId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "factchecks",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "comment": {
                    "type": Sequelize.TEXT,
                    "field": "comment",
                    "validate": {
                        "len": [10, 256]
                    },
                    "allowNull": false
                },
                "source": {
                    "type": Sequelize.STRING,
                    "field": "source",
                    "validate": {
                        "len": [10, 256],
                        "isUrl": true
                    },
                    "allowNull": false
                },
                "veracity": {
                    "type": Sequelize.ENUM('true', 'false', 'partial'),
                    "field": "veracity"
                },
                "verifiedByModerator": {
                    "type": Sequelize.BOOLEAN,
                    "field": "verifiedByModerator",
                    "defaultValue": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "checkerId": {
                    "type": Sequelize.INTEGER,
                    "field": "checkerId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "statementId": {
                    "type": Sequelize.INTEGER,
                    "field": "statementId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "statements",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "moderatorId": {
                    "type": Sequelize.INTEGER,
                    "field": "moderatorId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
