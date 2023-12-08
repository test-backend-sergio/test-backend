import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import 'dotenv/config';

console.log(process.env.DATABASE_URL);


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(4000);
}
bootstrap();
