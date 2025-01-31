import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { partnerRouter } from "./modules/partners/router";
import cors from "@koa/cors";

const app = new Koa();

app.use(bodyParser());
app.use(cors())

app.use(partnerRouter.routes());

export { app }


