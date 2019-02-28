'use strict';

const users = require('./users');
const events = require('./events');

module.exports = [
  {
    id: 1,
    content: 'My party name',
    politicianId: users[1].id,
    eventId: events[0].id,
  }
];
