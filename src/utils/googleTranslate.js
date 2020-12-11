import { apiKey } from "./env";

export const googleTranslate = require("google-translate")(apiKey, {});
