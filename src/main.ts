import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ["http://localhost:9000"],
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder().setTitle("NoryMarket Api").build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("doc", app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
