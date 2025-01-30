import { MultiPolygon } from "./MultiPolygon"
import { Point } from "./Point"

export type CreatePartner = {
  tradingName: string,
  ownerName: string,
  document: string,
  coverageArea: {
    coordinates: MultiPolygon
  },
  address: {
    coordinates: Point
  }
}