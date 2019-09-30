import React, { ReactNode } from 'react';

import { PageContent, RootContainer } from './Root.style';

interface Props {
  children: ReactNode;
}

const Root: React.FunctionComponent<Props> = ({ children }) => (
  <RootContainer>
    <PageContent>{children}</PageContent>
  </RootContainer>
);

export default Root;
