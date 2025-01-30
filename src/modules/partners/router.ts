import Router from "@koa/router";
import { controller } from "./controller";

const partnerRouter = new Router({prefix: "/partner"});

partnerRouter.post("/", controller.createPartner);

export { partnerRouter }