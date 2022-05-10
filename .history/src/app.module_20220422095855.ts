import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configValidationSchema } from './config.schema';
import { LoggerModule } from 'nestjs-pino';
import { PriceScraperModule } from './price-scraper/price-scraper.module';
import { AzureRetailService } from './price-scraper/services/azure-retail.service';
import { HttpModule } from '@nestjs/axios';
import { ProductModule } from './product/product.module';
import { VendorService } from './vendor/vendor.service';
import { VendorModule } from './vendor/vendor.module';
import { ProductService } from './product/product.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.common`, `.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        pinoHttp: { level: configService.get('DEBUG_LEVEL') },
      }),
    }),
    HttpModule,
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
        autoLoadEntities: configService.get('DATABASE_AUTO_LOAD_ENTITIES'),
        synchronize: configService.get('DATABASE_SYNCHRONIZE'),
      }),
    }),
    PriceScraperModule,
    ProductModule,
    VendorModule,
  ],
  controllers: [AppController],
  providers: [AppService, ProductService],
})
export class AppModule {}
