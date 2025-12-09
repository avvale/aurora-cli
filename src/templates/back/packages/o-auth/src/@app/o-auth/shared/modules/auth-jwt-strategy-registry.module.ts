import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as fs from 'node:fs';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
    imports: [PassportModule],
    providers: [JwtStrategy],
    exports: [JwtModule],
})
export class AuthJwtStrategyRegistryModule {
    static forRoot(): DynamicModule {
        return {
            module: AuthJwtStrategyRegistryModule,
            imports: [
                JwtModule.registerAsync({
                    imports: [ConfigModule],
                    inject: [ConfigService],
                    useFactory: (
                        configService: ConfigService,
                    ): JwtModuleOptions => {
                        return {
                            privateKey: fs.readFileSync(
                                configService.get('OAUTH_PRIVATE_KEY_PATH'),
                                'utf8',
                            ),
                            publicKey: fs.readFileSync(
                                configService.get('OAUTH_PUBLIC_KEY_PATH'),
                                'utf8',
                            ),
                            signOptions: {
                                algorithm: 'RS256',
                            },
                        };
                    },
                }),
            ],
        };
    }
}
