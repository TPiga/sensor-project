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

const convertToCartesian = (longitude: number, latitude: number) => {
  const r = 5;
  const x = r * Math.cos(longitude) * Math.sin(latitude);
  const y = r * Math.sin(longitude) * Math.sin(latitude);
  const z = r * Math.cos(latitude);

  return { x, y, z };
};

const NUMBER_OF_SATELLITES = 4;

class Home extends React.PureComponent<IProps, IState> {
  currentSocket: SocketIOClient.Socket | null = null;
  state = {
    currentIndex: 0,
    // @ts-ignore
    currentData: [] as ILineData,
  };
  globe: BABYLON.Mesh | null = null;
  satellites: { [key: number]: BABYLON.Mesh | null } = {};

  componentDidMount() {
    this.currentSocket = io(`http://localhost:8080/devices`, { path: '/websocket', secure: true });
    this.currentSocket.on('message', (message: any) => {
      const position = convertToCartesian(message.location.lat, message.location.long);

      const satellite = this.satellites[message.id];

      if (satellite) {
        satellite.position.x = position.x;
        satellite.position.y = position.y;
        satellite.position.z = position.z;
      }
    });
  }

  onSceneMount = (e: SceneEventArgs) => {
    const { canvas, scene, engine } = e;

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    this.globe = BABYLON.Mesh.CreateSphere('globe', 16, 8, scene);

    for (var i = 0; i < 4; i++)
      this.satellites[i] = BABYLON.Mesh.CreateSphere(`sphere${i}`, 16, 0.5, scene);

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
