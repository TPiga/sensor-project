import Koa from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';

import { addEndpoints } from 'routes';

// Koa set-up
const app = new Koa();
const koaRouter = new Router();

app.use(cors());

// Routing
addEndpoints(koaRouter);

app.use(koaRouter.routes());

// Listen for requests
app.listen(8000);
