import mongoose, { Model } from "mongoose";
import { MultiPolygon } from "./@types/MultiPolygon";
import { Point } from "./@types/Point";

export type IPartner = {
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
} & Document

const Schema = new mongoose.Schema<IPartner>(
  {
    tradingName: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    document: {
      type: String,
      required: true,
      unique: true
    },
    coverageArea: {
      type: {
        type: String,
        default: "MultiPolygon"
      },
      coordinates: {
        type: [[[[Number, Number]]]]
      }
    },
    address: {
      type: {
        type: String,
        default: "Point"
      },
      coordinates: {
        type: [Number, Number]
      }
    }
  },
  {
    collection: "Partner",
    timestamps: true
  }
)

export const Partner: Model<IPartner> = mongoose.model('Partner', Schema);

