import fetch from 'isomorphic-fetch';
import * as paths from './paths';

export default {
  getNextSessions(userId) {
    return fetch(`${paths.nextSessions}/${userId}`).then(response => response.json());
  },
};
