'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "date" on table "events"
 * changeColumn "date" on table "statements"
 *
 **/

var info = {
    "revision": 6,
    "name": "factcheck",
    "created": "2019-02-19T08:52:00.606Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "events",
            "date",
            {
                "type": Sequelize.DATE,
                "field": "date",
                "defaultValue": 1550566320566
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "statements",
            "date",
            {
                "type": Sequelize.DATE,
                "field": "date",
                "defaultValue": 1550566320579
            }
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
