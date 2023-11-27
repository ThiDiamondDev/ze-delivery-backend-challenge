import { Router } from "express";
import {
  getNearestPartner,
  getPartnerById,
  saveNewPartner,
} from "@controllers/partnerController";

const router = Router();

router.get("/partners/:id", getPartnerById);
router.get("/partners?", getNearestPartner);
router.post("/partners/", saveNewPartner);

export default router;
