// Import the required modules
import request from "supertest";
import { PartnerModel } from "@models/partnerModel";
import { app, connect, disconnect } from "@/app";
import { testPartnerData } from "./testPartnerData";
import {
  INVALID_LOCATION_ERROR,
  PARTNER_EXISTS_ERROR,
  PARTNER_NOT_FOUND_ERROR,
  SERVER_ERROR,
} from "@/errors/partnerErrors";

afterAll(async () => {
  await disconnect();
});

describe("GET /partners/:id", () => {
  beforeAll(async () => {
    await PartnerModel.create(testPartnerData);
  });

  afterAll(async () => {
    await PartnerModel.deleteOne({ id: testPartnerData.id });
  });

  it("should return 200 and the partner data if the id exists", async () => {
    const response = await request(app).get(`/partners/${testPartnerData.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(testPartnerData);
  });

  it("should return 404 and an error message if the id does not exist", async () => {
    const response = await request(app).get("/partners/-1");

    expect(response.status).toBe(PARTNER_NOT_FOUND_ERROR.status);
    expect(response.body).toStrictEqual(PARTNER_NOT_FOUND_ERROR);
  });
  it("should return 500 and an error message with invalid id type", async () => {
    const response = await request(app).get("/partners/@");

    expect(response.status).toBe(SERVER_ERROR.status);
    expect(response.body).toStrictEqual(SERVER_ERROR);
  });
});
describe("POST /partners", () => {
  beforeAll(async () => {
    await PartnerModel.deleteOne({ id: testPartnerData.id });
  });

  // Test the happy path
  it("should return 201 and the new partner data if the partner does not exist", async () => {
    const response = await request(app)
      .post("/partners/")
      .send(testPartnerData);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(testPartnerData);

    const savedPartner = await PartnerModel.findOne({
      document: testPartnerData.document,
    });

    expect(response.body.id).toEqual(savedPartner?.id);
  });

  it("should return 409 if the partner already exists", async () => {
    await PartnerModel.create(testPartnerData);

    const response = await request(app).post("/partners").send(testPartnerData);

    expect(response.status).toBe(PARTNER_EXISTS_ERROR.status);
    expect(response.body).toStrictEqual(PARTNER_EXISTS_ERROR);
    await PartnerModel.deleteOne({ id: testPartnerData.id });
  });
  it("should return 500 and an error message with invalid data", async () => {
    const response = await request(app).post("/partners/").send({});

    expect(response.status).toBe(SERVER_ERROR.status);
    expect(response.body).toStrictEqual(SERVER_ERROR);
  });
});
describe("GET /partners?lat&long", () => {
  beforeAll(async () => {
    await PartnerModel.create(testPartnerData);
  });

  afterAll(async () => {
    await PartnerModel.deleteOne({ id: testPartnerData.id });
  });

  it("should return 200 and the nearest partner data if the coordinates are valid", async () => {
    const [lng, lat] = testPartnerData.address.coordinates;
    const response = await request(app).get(`/partners?lng=${lng}&lat=${lat}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(testPartnerData);
  });

  it("should return 400 and an error message if provided a wrong lng or lat values", async () => {
    const response = await request(app).get("/partners?lng=WRONG&lat=WRONG");

    expect(response.status).toBe(INVALID_LOCATION_ERROR.status);
    expect(response.body).toStrictEqual(INVALID_LOCATION_ERROR);
  });
  it("should return 404 and an error message if there is no near partner", async () => {
    const response = await request(app).get("/partners?lng=-176.09&lat=85.48");

    expect(response.status).toBe(PARTNER_NOT_FOUND_ERROR.status);
    expect(response.body).toStrictEqual(PARTNER_NOT_FOUND_ERROR);
  });
});
