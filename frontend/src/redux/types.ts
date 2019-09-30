import { HomeAction, HomeState } from './Home';

export type RootState = Readonly<{
  home: HomeState;
}>;
export type RootAction = HomeAction;
