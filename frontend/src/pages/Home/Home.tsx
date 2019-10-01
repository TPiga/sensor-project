import * as React from 'react';
import io from 'socket.io-client';
import { HomeContainer, Title, Container, DescriptionLine, DescriptionList } from './Home.style';
import { getNumberOfMessages } from 'redux/Home';
import { formatLineData, ILineData } from 'utilities/graph';
import LineGraph from 'components/LineGraph';

interface IProps {
  getNumberOfMessages: typeof getNumberOfMessages.request;
  numberOfMessages: null | number;
}

interface IState {
  currentIndex: number;
  currentData: ILineData;
}

class Home extends React.PureComponent<IProps, IState> {
  currentSocket: SocketIOClient.Socket | null = null;
  state = {
    currentIndex: 0,
    // @ts-ignore
    currentData: [] as ILineData,
  };

  componentDidMount() {
    this.currentSocket = io(`http://localhost:8080/devices`, { path: '/websocket', secure: true });
    this.currentSocket.on('message', (message: any) =>
      this.setState({
        currentIndex: this.state.currentIndex + 1,
        currentData: [...this.state.currentData, { x: this.state.currentIndex, y: message }].slice(
          -5,
        ),
      }),
    );
  }

  render() {
    return (
      <HomeContainer>
        <Title>Welcome to my Challenge Project!</Title>
        <Container>
          <LineGraph data={formatLineData(this.state.currentData)} />
        </Container>
      </HomeContainer>
    );
  }
}

export default Home;
