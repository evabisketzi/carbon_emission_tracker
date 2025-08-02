import { Module } from "@nestjs/common";
import { Pool } from "pg";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USER"),
        password: configService.get<string>("DB_PASS"),
        database: configService.get<string>("DB_NAME"),
        entities: [__dirname + "/../**/*.entity.{ts,js}"],
        autoLoadEntities: true,
        synchronize: false,
        migrationsRun: false,
      }),
    }),
  ],
})
export class DatabaseModule {}

// For future reference this is a way to have a dbProvider without typeORM
// const dbProvider = {
//   provide: PG_CONNECTION,
//   useValue: new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'somedb',
//     password: 'meh',
//     port: 5432,
//   }),
// };

// @Module({
//   providers: [dbProvider],
//   exports: [dbProvider],
// })
// export class DbModule {}
