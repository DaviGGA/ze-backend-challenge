import * as z from "zod";
import { CreatePartner } from "../@types/CreatePartner";

const coverageAreaObject = z.object({
  coordinates: z.array(z.array(z.array(z.tuple([z.number(), z.number()]))))
})

const addressObject = z.object({
  coordinates: z.tuple([z.number(), z.number()])
})

const createPartnerSchema = z.object({
  tradingName: z.string().min(1, "tradingName is required"),
  ownerName: z.string().min(1, "tradingName is required"),
  document: z.string().min(1, "document is required"),
  coverageArea: coverageAreaObject,
  address: addressObject
});

export function validatePartner(partner: unknown): CreatePartner {
  return createPartnerSchema.parse(partner);
}