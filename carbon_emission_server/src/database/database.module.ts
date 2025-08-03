import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                host: configService.get<string>("DB_HOST"),
                port: configService.get<number>("DB_PORT", 5432),
                username: configService.get<string>("DB_USER", "admin"),
                password: configService.get<string>("DB_PASS", "password"),
                database: configService.get<string>(
                    "DB_NAME",
                    "carbon_emission_tracker"
                ),
                entities: [__dirname + "/../**/*.entity.{ts,js}"],
                autoLoadEntities: true,
                synchronize: false,
                migrationsRun: false
            })
        })
    ]
})
export class DatabaseModule {}
