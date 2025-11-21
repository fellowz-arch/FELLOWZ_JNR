import express from "express";
import {
  stkPush,
  mpesaCallback,
  mpesaWithdraw,
} from "../controllers/mpesaController.js";

const router = express.Router();

router.post("/stk", stkPush);
router.post("/callback", mpesaCallback);
router.post("/withdraw", mpesaWithdraw);

export default router;
