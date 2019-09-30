import { basicHandler } from 'controllers';

export const addEndpoints = publicRouter => {
  publicRouter.get('/api/message/count/', basicHandler);
};
