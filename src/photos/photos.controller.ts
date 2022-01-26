import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import path = require("path");
import { join } from "path/posix";
import { Observable, of } from "rxjs";
import { v4 } from "uuid";

export const storage = {
  storage: diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, "") + "-" + v4();
      const extension: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller("photos")
export class PhotosController {
  @Post("upload")
  @UseInterceptors(FileInterceptor("file", storage))
  uploadSingle(@UploadedFile() file): Observable<Object> {
    return of({
      imagePath: file.filename,
    });
  }

  // example
  // http://localhost:3000/photos/download-0a633ac9-051c-4e3f-9bb8-63a4960b8296.png
  @Get("/:imagename")
  findUploadedImage(
    @Param("imagename")
    imagename: string,
    @Res() res
  ): Observable<Object> {
    return of(res.sendFile(join(process.cwd(), "uploads/" + imagename)));
  }
}
