import fetch from 'isomorphic-fetch';
import * as paths from './paths';

export default {
  getSession(sessionId) {
    return fetch(`${paths.sessions}/${sessionId}`).then(response => response.json());
  },
};
