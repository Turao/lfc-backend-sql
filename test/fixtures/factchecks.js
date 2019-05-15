'use strict';

import users from './users';
import statements from './statements';

export default [
  {
    id: 1,
    comment: 'Some Random Organization',
    source: 'source.com',
    veracity: 'partial',
    // verifiedByModerator: false,
    checkerId: users[0].id,
    statementId: statements[0].id, 
    moderatorId: users[0].id,
  }
];
