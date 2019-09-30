import { createAsyncAction } from 'typesafe-actions';
import { INumberOfMessages } from './types';

export const getNumberOfMessages = createAsyncAction(
  'Home/NUMBER_OF_MESSAGES_REQUEST',
  'Home/NUMBER_OF_MESSAGES_SUCCESS',
  'Home/NUMBER_OF_MESSAGES_FAILURE',
)<undefined, INumberOfMessages, undefined>();

export default {
  getNumberOfMessages,
};
