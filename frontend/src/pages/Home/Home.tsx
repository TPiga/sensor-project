import * as React from 'react';
import { HomeContainer, Title, Container, DescriptionLine, DescriptionList } from './Home.style';
import { getNumberOfMessages } from 'redux/Home';

interface IProps {
  getNumberOfMessages: typeof getNumberOfMessages.request;
  numberOfMessages: null | number;
}

class Home extends React.PureComponent<IProps> {
  componentDidMount() {
    this.props.getNumberOfMessages();
  }

  render() {
    return (
      <HomeContainer>
        <Title>Welcome to my Challenge Project!</Title>
        <Container>
          <DescriptionList>
            {this.props.numberOfMessages && (
              <DescriptionLine>
                Current number of messages are: {this.props.numberOfMessages}
              </DescriptionLine>
            )}
          </DescriptionList>
        </Container>
      </HomeContainer>
    );
  }
}

export default Home;
