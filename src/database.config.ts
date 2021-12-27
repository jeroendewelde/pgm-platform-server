import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
    constructor(
        private configService: ConfigService
    ) {}

    createTypeOrmOptions() {
        if(process.env.NODE_ENV === 'prod') {
            return this.configService.get('databaseProd');
        } else {
            return this.configService.get('databaseDev');
        }
    }
}