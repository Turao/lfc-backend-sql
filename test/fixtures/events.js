'use strict';

const organizations = require('./organizations');

module.exports = [
  {
    id: 1,
    name: '2020 US Elections',
    date: new Date(),
    organizationId: organizations[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];
