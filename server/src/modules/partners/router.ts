import Router from "@koa/router";
import { controller } from "./controller";

const partnerRouter = new Router({prefix: "/partner"});

partnerRouter.post("/", controller.createPartner);
partnerRouter.get("/", controller.findAllPartners);
partnerRouter.get("/nearest", controller.findNearestPartner);
partnerRouter.get("/:id", controller.findPartnerById);

export { partnerRouter }