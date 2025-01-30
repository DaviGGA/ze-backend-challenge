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

async function findNearestPartner(point: Point) {
  
  const partners = await Partner.find();

  const sortByLeastDistance = (a: IPartner, b: IPartner) =>
    partnerDistanceTo(a, point) - partnerDistanceTo(b, point) 

  return partners
    .concat()
    .sort(sortByLeastDistance)
    .find(pointInCoverage)

}

const partnerDistanceTo = ({address}: IPartner, point: Point) =>
  turf.distance(address.coordinates, point)

const pointInCoverage = (partner: IPartner) => 
  turf.booleanPointInPolygon(
    turf.point(partner.address.coordinates),
    turf.multiPolygon(partner.coverageArea.coordinates)
  )

export const service = {
  createPartner,
  findPartnerById,
  findNearestPartner
} 