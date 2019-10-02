import * as React from 'react';
import io from 'socket.io-client';
import { HomeContainer, Title, Container, Body, SideBar } from './Home.style';
import { getNumberOfMessages } from 'redux/Home';
import { formatLineData, ILineData } from 'utilities/graph';
import LineGraph from 'components/LineGraph';
import { Button, Icon } from '@blueprintjs/core';
import * as BABYLON from 'babylonjs';
import BabylonScene, { SceneEventArgs } from 'components/BabylonJS/SceneComponent'; // import the component above linking to file we just created.

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

  onSceneMount = (e: SceneEventArgs) => {
    const { canvas, scene, engine } = e;

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene);

    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);

    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });
  };

  render() {
    return (
      <HomeContainer>
        <BabylonScene onSceneMount={this.onSceneMount} width={800} height={696} />
        <SideBar>
          <Title>Welcome to my Challenge Project!</Title>
          <Button icon="refresh" intent="danger" text="Reset" />
          <Button icon="user" rightIcon="caret-down" text="Profile settings" />
          <Button rightIcon="arrow-right" intent="success" text="Next step" />
          <Button>
            <Icon icon="document" /> Upload... <Icon icon="small-cross" />
          </Button>
        </SideBar>
      </HomeContainer>
    );
  }
}

export default Home;
