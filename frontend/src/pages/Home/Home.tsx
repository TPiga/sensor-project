import * as React from 'react';
import io from 'socket.io-client';
import { HomeContainer, Title, Container, DescriptionLine, DescriptionList } from './Home.style';
import { getNumberOfMessages } from 'redux/Home';

interface IProps {
  getNumberOfMessages: typeof getNumberOfMessages.request;
  numberOfMessages: null | number;
}

class Home extends React.PureComponent<IProps> {
  currentSocket: SocketIOClient.Socket | null = null;

  componentDidMount() {
    this.currentSocket = io(`http://localhost:8080/devices`, { path: '/websocket', secure: true });
    this.currentSocket.on('message', (message: any) => console.log('message', message));
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
