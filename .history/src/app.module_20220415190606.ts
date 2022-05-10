import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.common`, `.env.stage.${process.env.STAGE}`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      _useFactory: async (configService: ConfigService) => ({
        type: configService.get('DATABASE_TYPE'),
        entities: configService.get('DATABASE_TYPE'),
        migrations: configService.get('DATABASE_TYPE'),
        cli: configService.get('DATABASE_TYPE'),
        migrationsrun: configService.get('DATABASE_TYPE'),
        database: configService.get('DATABASE_TYPE'),
        host: configService.get('DATABASE_TYPE'),
        port: configService.get('DATABASE_TYPE'),
        username: configService.get('DATABASE_TYPE'),
        password: configService.get('DATABASE_TYPE'),
      }),
      get useFactory() {
        return this._useFactory;
      },
      set useFactory(value) {
        this._useFactory = value;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
