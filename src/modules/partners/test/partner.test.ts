import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { connectMemoryDatabase, disconnectDatabase } from "../../../database/mongo";
import http from "http";
import request  from "supertest";
import { app } from "../../../app";
import mongoose from "mongoose";

describe("POST /partner", () => {

  let server: http.Server

  beforeAll(async () => {
    await connectMemoryDatabase();
    server = http.createServer(app.callback());
    server.listen();
  })

  afterAll(async () => {
    server.close();
    await disconnectDatabase();
  })

  beforeEach(async () => {
    await mongoose.connection.dropDatabase()
  })

  it("Create successfully", async () => {

    const partner = {
      "tradingName": "Adega da Cerveja - Pinheiros",
      "ownerName": "Zé da Silva",
      "document": "1432132123891/0001",
      "coverageArea": { 
        "type": "MultiPolygon", 
        "coordinates": [
          [[[30, 20], [45, 40], [10, 40], [30, 20]]], 
          [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
        ]
      },
      "address": { 
        "type": "Point",
        "coordinates": [-46.57421, -21.785741]
      }
    }

    const response = await request(server)
      .post("/partner")
      .send(partner)
      .expect(201)

    expect(response.body.data.tradingName).toBe(partner.tradingName)
    expect(response.body.data.ownerName).toBe(partner.ownerName)
    expect(response.body.data.coverageArea).toStrictEqual(partner.coverageArea)
    expect(response.body.data.address).toStrictEqual(partner.address)

  })

  it("When coverageArea is invalid should fail", async () => {
    const partner = {
      "tradingName": "Adega da Cerveja - Pinheiros",
      "ownerName": "Zé da Silva",
      "document": "1432132123891/0001",
      "coverageArea": { 
        "type": "MultiPolygon", 
        "coordinates": [
          [[30, 20], [45, 40], [10, 40], [30, 20]]
        ], 
      },
      "address": { 
        "type": "Point",
        "coordinates": [-46.57421, -21.785741]
      }
    }

    await request(server)
      .post("/partner")
      .send(partner)
      .expect(500)
  })

  it("When address is invalid should fail", async () => {
    const partner = {
      "tradingName": "Adega da Cerveja - Pinheiros",
      "ownerName": "Zé da Silva",
      "document": "1432132123891/0001",
      "coverageArea": { 
        "type": "MultiPolygon", 
        "coordinates": [
          [[30, 20], [45, 40], [10, 40], [30, 20]]
        ], 
      },
      "address": { 
        "type": "Point",
        "coordinates": [-21.785741]
      }
    }

    await request(server)
      .post("/partner")
      .send(partner)
      .expect(500)
  })

})