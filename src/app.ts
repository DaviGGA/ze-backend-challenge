import Koa from "koa";
import bodyParser from "koa-bodyparser";

const app = new Koa();

app.use(bodyParser());

export { app }


