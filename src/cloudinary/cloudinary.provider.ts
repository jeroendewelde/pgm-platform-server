import { ConfigOptions, v2 } from "cloudinary";
import { CLOUDINARY } from "./constants";

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): ConfigOptions => {
    return v2.config({
      cloud_name: "dgfgw9ngd",
      api_key: "298424895728527",
      api_secret: "JTKAQNRibTZzynWGf4Mmok_hreE",
    });
  },
};
