import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  await app.listen((port),()=>{
    try{
      console.log(`server is running on port:${port}`)
    }catch(err){
      console.log(err);
    }
  });
}
bootstrap();
