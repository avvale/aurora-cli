import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        ServeStaticModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => [
                {
                    rootPath: join(
                        process.cwd(),
                        configService.get('STORAGE_ACCOUNT_PUBLIC_PATH'),
                    ),
                    serveRoot: `/${configService.get('STORAGE_ACCOUNT_PUBLIC_PATH')}`,
                },
            ],
        }),
    ],
})
export class ServerStaticModule {}
