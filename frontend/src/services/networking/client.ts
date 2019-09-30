import request from 'superagent';

const backendBaseUrl = process.env.REACT_APP_API_URL || '';

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

class Client {
  baseUrl: string;
  agent: request.SuperAgentStatic;
  tokenKey: string = 'token';

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.agent = request.agent();
    // @ts-ignore
    this.agent.accept('application/json');
  }

  async request(method: Method, endpoint: string, data: object | null = null) {
    const url = /^https?:\/\//.test(endpoint) ? endpoint : `${this.baseUrl}${endpoint}`;
    let promise = this.agent[method](url);

    const { body } = await promise;
    return body;
  }

  get(endpoint: string) {
    return this.request('get', endpoint);
  }

  post(endpoint: string, data: object) {
    return this.request('post', endpoint, data);
  }

  makeNumberOfMessagesRequest = () => this.get('/api/message/count/');
}

const client = new Client(backendBaseUrl);

export default client;
