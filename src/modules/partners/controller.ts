import { Context } from "koa";
import { validatePartner } from "./validators/create-partner-validator";
import { service } from "./service";

async function createPartner(ctx: Context) {
  try {
    const partnerBody = validatePartner(ctx.request.body);
    const createdPartner = await service.createPartner(partnerBody)
  
    ctx.status = 201;
    ctx.body = {
      data: createdPartner,
      message: "Partner successfully created."
    }
  } catch(error) {
    throw error
  }
}

async function findPartnerById(ctx: Context) {
  try {
    const { id } = ctx.params;
    const foundPartner = await service.findPartnerById(id);
  
    ctx.status = 200;
    ctx.body = {
      data: foundPartner,
      message: "Partner successfully found."
    }
  } catch(error) {
    throw error
  }
}

export const controller = {
  createPartner,
  findPartnerById
}