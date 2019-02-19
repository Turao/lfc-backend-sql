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
    "name": "user",
    "created": "2019-02-19T08:51:03.228Z",
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
                        "min": 1,
                        "max": 64
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
                        "min": 1,
                        "max": 64
                    },
                    "allowNull": false
                },
                "abbreviation": {
                    "type": Sequelize.STRING,
                    "field": "abbreviation",
                    "validate": {
                        "min": 1,
                        "max": 64,
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
                        "min": 1,
                        "max": 64
                    },
                    "allowNull": false
                },
                "date": {
                    "type": Sequelize.DATE,
                    "field": "date",
                    "defaultValue": 1550566263183
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
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "organizations",
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
                        "min": 8,
                        "max": 64,
                        "isAlphanumeric": true
                    },
                    "allowNull": false
                },
                "firstName": {
                    "type": Sequelize.STRING,
                    "field": "firstName",
                    "validate": {
                        "min": 1,
                        "max": 64,
                        "isAlpha": true
                    },
                    "allowNull": false
                },
                "lastName": {
                    "type": Sequelize.STRING,
                    "field": "lastName",
                    "validate": {
                        "min": 1,
                        "max": 64,
                        "isAlpha": true
                    },
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "validate": {
                        "isEmail": true,
                        "max": 64
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
                        "min": 10,
                        "max": 256
                    },
                    "allowNull": false
                },
                "date": {
                    "type": Sequelize.DATE,
                    "field": "date",
                    "defaultValue": 1550566263195
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
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "users",
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
                        "min": 10,
                        "max": 256
                    },
                    "allowNull": false
                },
                "source": {
                    "type": Sequelize.STRING,
                    "field": "source",
                    "validate": {
                        "min": 10,
                        "max": 256,
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
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "statementId": {
                    "type": Sequelize.INTEGER,
                    "field": "statementId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "statements",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "moderatorId": {
                    "type": Sequelize.INTEGER,
                    "field": "moderatorId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
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
