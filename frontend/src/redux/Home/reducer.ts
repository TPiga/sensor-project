import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import { getNumberOfMessages } from './actions';

export type HomeAction = ActionType<
  typeof getNumberOfMessages.success | typeof getNumberOfMessages.failure
>;

export type HomeState = Readonly<{
  numberOfMessages: null | number;
}>;

const initialState: HomeState = { numberOfMessages: null };

const reducer = (state: HomeState = initialState, action: AnyAction) => {
  const typedAction = action as HomeAction;
  switch (typedAction.type) {
    case getType(getNumberOfMessages.success):
      return {
        ...state,
        numberOfMessages: typedAction.payload.messageCount,
      };
    default:
      return state;
  }
};

export default reducer;
