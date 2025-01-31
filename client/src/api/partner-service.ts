import { Partner } from "@/@types/Partner";
import { api } from "./axios";
import { Response } from "@/@types/Response";
import * as turf from "@turf/turf";
import { Point } from "@/@types/Point";

async function findAllPartners() {
  const response = await api.get<Response<Partner[]>>("/partner");
  
  const partners = response.data.data;

  partners.forEach(partner => {
    turf.coordEach(
      turf.multiPolygon(partner.coverageArea.coordinates),
      (coord) => [coord[0], coord[1]] = [coord[1], coord[0]])
  })

 
  return partners.map(partner => ({
    ...partner,
    address: {
      ...partner.address,
      coordinates: [partner.address.coordinates[1], partner.address.coordinates[0]] as Point,
    }

  }))

}

export const partnerService = {
  findAllPartners
}