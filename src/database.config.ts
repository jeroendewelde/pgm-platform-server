import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
    constructor(
        private configService: ConfigService
    ) {}

    createTypeOrmOptions() {
      console.log('node env', process.env.NODE_ENV);
        if(process.env.NODE_ENV === 'prod') {
          console.log('connection', this.configService.get('databaseProd'));
            return this.configService.get('databaseProd');
        } else {
          console.log('development database');
          console.log('connection', this.configService.get('databaseDev'));
            return this.configService.get('databaseDev');
        }
    }
}