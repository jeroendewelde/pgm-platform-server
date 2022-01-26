import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { graphqlUploadExpress } from "graphql-upload";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  console.log("listening to port ", process.env.PORT);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
