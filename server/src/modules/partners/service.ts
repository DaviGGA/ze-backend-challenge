import { map } from "zod";
import { redisClient } from "../../database/redis";
import { CreatePartner } from "./@types/CreatePartner";
import { Point } from "./@types/Point";
import { IPartner, Partner } from "./PartnerModel";
import * as turf from "@turf/turf";

async function createPartner(partnerBody: CreatePartner): Promise<IPartner> {
    
  const partnerExists = await Partner.exists({
    document: partnerBody.document
  })

  if(partnerExists) {
    throw new Error("Partner alrealdy exists.")
  }

  return await Partner.create(partnerBody);
}

async function findPartnerById(id: string): Promise<IPartner> {
  const foundPartner = await Partner.findById(id);

  if(!foundPartner) {
    throw new Error("Partner not found");
  }

  return foundPartner;
}

async function findNearestPartner(point: Point): Promise<IPartner> {

  const pointCacheId = `long:${point[0]};lat:${point[1]}`
  const foundCache = await redisClient.get(pointCacheId);

  if (foundCache) {
    return JSON.parse(foundCache)
  }

  const partners = await Partner.find();

  const sortByLeastDistance = (a: IPartner, b: IPartner) =>
    partnerDistanceTo(a, point) - partnerDistanceTo(b, point)

  const nearestPartner = partners
    .concat()
    .sort(sortByLeastDistance)
    .find(partner => pointInCoverage(partner, point))

  
  
  if(!nearestPartner) {
    throw new Error("No partner was found. Possibly, this point isn't inside the coverage.")
  }
  
  
  redisClient.setEx(
    pointCacheId,
    120, 
    JSON.stringify(nearestPartner)
  )

  return nearestPartner;

}

async function findAllPartners() {
  return await Partner.find();
}

const partnerDistanceTo = ({address}: IPartner, point: Point) =>
  turf.distance(address.coordinates, point, {units: "meters"})

const pointInCoverage = (partner: IPartner, point: Point) => 
  turf.booleanPointInPolygon(
    turf.point(point),
    turf.multiPolygon(partner.coverageArea.coordinates)
  )

export const service = {
  createPartner,
  findPartnerById,
  findNearestPartner,
  findAllPartners
} 