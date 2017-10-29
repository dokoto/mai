import fetch from 'isomorphic-fetch';
import * as paths from './paths';

export default {
  getLastSessions(userId) {
    return fetch(`${paths.lastSessions}/${userId}`).then(response => response.json());
  },
};
