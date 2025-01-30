import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { partnerRouter } from "./modules/partners/router";

const app = new Koa();

app.use(bodyParser());

app.use(partnerRouter.routes());

export { app }


