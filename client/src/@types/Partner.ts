import { MultiPolygon } from "./MultiPolygon"
import { Point } from "./Point"

export type Partner = {
  _id: string,
  tradingName: string,
  ownerName: string,
  document: string,
  coverageArea: {
    type: "MultiPolygon",
    coordinates: MultiPolygon
  },
  address: {
    type: "Point",
    coordinates: Point
  }
}