import { Context } from "koa";
import { validatePartner } from "./validators/create-partner-validator";
import { service } from "./service";
import { Point } from "./@types/Point";

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

async function findNearestPartner(ctx: Context) {
  try {

    const {lat, long} = ctx.request.query as {long: string, lat: string};
    const numberLong = parseFloat(long);
    const numberLat = parseFloat(lat);
    const point: Point = [numberLong, numberLat]

    const nearestPartner = await service.findNearestPartner(point)
  
    ctx.status = 200;
    ctx.body = {
      data: nearestPartner,
      message: "Nearest partner successfully found."
    }
  } catch(error) {
    throw error
  }
}

async function findAllPartners(ctx: Context) {
  try {
    const partners = await service.findAllPartners();

    ctx.status = 200
    ctx.body = {
      data: partners,
      message: "Partners successfully found."
    }
  } catch(error) {
    throw error
  }
}

export const controller = {
  createPartner,
  findPartnerById,
  findNearestPartner,
  findAllPartners
}