import { Request, Response } from "express";
import { PartnerModel } from "@models/partnerModel";
import {
  IError,
  INVALID_LOCATION_ERROR,
  PARTNER_EXISTS_ERROR,
  PARTNER_NOT_FOUND_ERROR,
  SERVER_ERROR,
} from "@/errors/partnerErrors";
import { nearestPartnerQuery } from "@models/geoJson";

const sendError = (res: Response, error: IError) =>
  res.status(error.status).send(error);

export const getPartnerById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const partner = await PartnerModel.findOne({ id });

    if (!partner) {
      sendError(res, PARTNER_NOT_FOUND_ERROR);
      return;
    }

    res.status(200).json(partner);
  } catch (err) {
    sendError(res, SERVER_ERROR);
  }
};

export const saveNewPartner = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const partnerData = req.body;

    const existingPartner = await PartnerModel.findOne({
      id: partnerData.id,
    });

    if (existingPartner) sendError(res, PARTNER_EXISTS_ERROR);
    else {
      const newPartner = new PartnerModel(partnerData);

      await newPartner.save();
      res.status(201).json(newPartner);
    }
  } catch (err) {
    sendError(res, SERVER_ERROR);
  }
};

export const getNearestPartner = async (req: Request, res: Response) => {
  const lng = parseFloat(req.query.lng as string);
  const lat = parseFloat(req.query.lat as string);

  if (isNaN(lng) || isNaN(lat)) {
    sendError(res, INVALID_LOCATION_ERROR);
    return;
  }
  try {
    const [partner] = await PartnerModel.aggregate([
      nearestPartnerQuery([lng, lat]),
    ]);

    if (partner) {
      res.status(200).json(partner);
    } else {
      sendError(res, PARTNER_NOT_FOUND_ERROR);
    }
  } catch (error) {
    sendError(res, SERVER_ERROR);
  }
};
