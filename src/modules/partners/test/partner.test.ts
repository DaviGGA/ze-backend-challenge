import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { connectMemoryDatabase, disconnectDatabase } from "../../../database/mongo";
import http from "http";
import request  from "supertest";
import { app } from "../../../app";
import mongoose from "mongoose";

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

describe("POST /partner", () => {

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

describe("GET /partner/:id", () => {

  it("Find partner by id successfully", async () => {

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

    const partnerResponse = await request(server)
      .post("/partner")
      .send(partner)
      .expect(201)

    const createdPartner = partnerResponse.body.data;
    const partnerId = partnerResponse.body.data._id;

    const response = await request(server)
      .get(`/partner/${partnerId}`)
      .expect(200)

    expect(response.body.data).toMatchObject(createdPartner);

  })

  it("When no partner found should fail.", async () => {
    await request(server)
      .get(`/partner/1234`)
      .expect(500)
  })

})

describe("GET partner/nearest", () => {

  it("Find the nearest partner", async () => {
    const partners = [
      {
        "tradingName": "Loja A",
        "ownerName": "John A",
        "document": "1432132123891/0001",
        "coverageArea": { 
          "type": "MultiPolygon", 
          "coordinates": [
            [
              [[0, 0], [4, 0], [4, 4], [0, 4], [0, 0]]
            ]
          ],
        },
        "address": { 
          "type": "Point",
          "coordinates": [1, 1]
        }
      },
      {
        "tradingName": "Loja B",
        "ownerName": "John B",
        "document": "1432132123891/0002",
        "coverageArea": { 
          "type": "MultiPolygon", 
          "coordinates": [
            [
              [[10, 10], [14, 10], [14, 14], [10, 14], [10, 10]]
            ]
          ],
        },
        "address": { 
          "type": "Point",
          "coordinates": [9, 9]
        }
      },
      {
        "tradingName": "Loja C",
        "ownerName": "John C",
        "document": "1432132123891/0003",
        "coverageArea": { 
          "type": "MultiPolygon", 
          "coordinates": [
            [
              [[5, 5], [9, 5], [9, 9], [5, 9], [5, 5]]
            ]
          ],
        },
        "address": { 
          "type": "Point",
          "coordinates": [6, 6]
        }
      },
  
    ]
  
    const partnerAPromise = request(server)
      .post("/partner")
      .send(partners[0])
      .expect(201)
    
    const partnerBPromise = request(server)
      .post("/partner")
      .send(partners[1])
      .expect(201)
    
    const partnerCPromise = request(server)
      .post("/partner")
      .send(partners[2])
      .expect(201)
  
    await Promise.all([
      partnerAPromise,
      partnerBPromise,
      partnerCPromise
    ])

    const response = await request(server)
      .get("/partner/nearest?long=8&lat=8")
      .expect(200)

    expect(response.body.data).toMatchObject(partners[2])
      
  })


  
})