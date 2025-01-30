import * as z from "zod";
import { LatLong } from "../@types/LatLong";

const latLongSchema = z.object({
  lat: z.number(),
  long: z.number()
});

export function validateLatLong(latLong: unknown): LatLong {
  return latLongSchema.parse(latLong);
}