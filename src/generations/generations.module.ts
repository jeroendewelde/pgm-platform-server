import { Module } from '@nestjs/common';
import { GenerationsService } from './generations.service';
import { GenerationsResolver } from './generations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Generation } from './entities/generation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Generation]),
  ],
  providers: [GenerationsResolver, GenerationsService]
})
export class GenerationsModule {}
