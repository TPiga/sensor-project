import { RootState } from 'redux/types';

export const selectNumberOfMessages = (store: RootState) => store.home.numberOfMessages;
