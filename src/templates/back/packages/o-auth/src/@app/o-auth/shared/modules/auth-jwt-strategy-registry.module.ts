import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CqrsConfigModule } from 'src/@aurora/cqrs-config.module';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
    imports: [
        CqrsConfigModule,
        PassportModule,
    ],
    providers: [
        JwtStrategy,
    ],
    exports: [
        JwtModule,
    ],
})
export class AuthJwtStrategyRegistryModule
{
    static forRoot(jwtOptions: JwtModuleOptions): DynamicModule
    {
        return {
            module : AuthJwtStrategyRegistryModule,
            imports: [
                JwtModule.register(jwtOptions),
            ],
        };
    }
}