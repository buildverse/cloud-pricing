import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configValidationSchema } from './config.schema';
import { AwsBulkService } from './price-scraper/services/aws-bulk.service';
import { AwsSpotService } from './price-scraper/services/aws-spot.service';
import { GcpCatalogService } from './price-scraper/services/gcp-catalog.service';
import { GcpMachineTypesService } from './price-scraper/services/gcp-machine-types.service';
import { AzureRetailService } from './price-scraper/services/azure-retail.service';
import { LoggerModule } from 'nestjs-pino';
import { PriceScraperModule } from './price-scraper/price-scraper.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.common`, `.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    LoggerModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.get('DATABASE_DB'),
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        migrations: [__dirname + '/migrations/*{.js,.ts}'],
        cli: { migrationsDir: 'src/migrations' },
        migrationsrun: configService.get('DATABASE_MIGRATIONS_RUN'),
        logging: configService.get('DATABASE_LOGGING'),
      }),
    }),
    PriceScraperModule,
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}