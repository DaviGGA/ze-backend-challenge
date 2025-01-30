import { CreatePartner } from "./@types/CreatePartner";
import { IPartner, Partner } from "./PartnerModel";


async function createPartner(partnerBody: CreatePartner): Promise<IPartner> {
    
  const partnerExists = await Partner.exists({
    document: partnerBody.document
  })

  if(partnerExists) {
    throw new Error("Partner alrealdy exists.")
  }

  return await Partner.create(partnerBody);
}

export const service = {
  createPartner
} 