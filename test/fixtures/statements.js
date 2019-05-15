'use strict';

import users from './users';
import events from './events';

export default [
  {
    id: 1,
    content: 'My party name',
    politicianId: users[1].id,
    eventId: events[0].id,
  }
];
