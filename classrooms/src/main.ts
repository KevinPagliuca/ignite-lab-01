import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 3334;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'classroom',
        brokers: ['localhost:29092'],
      },
    },
  });

  app.startAllMicroservices().then(() => {
    console.log(`[Classroom] Microservice running`);
  });

  await app.listen(PORT, () =>
    console.log(`[Classroom] Server is running on port: ${PORT} 🔥🚀`),
  );
}
bootstrap();
