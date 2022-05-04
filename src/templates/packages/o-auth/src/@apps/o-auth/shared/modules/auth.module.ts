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
export class AuthModule
{
    static forRoot(jwtOptions: JwtModuleOptions): DynamicModule
    {
        return {
            module : AuthModule,
            imports: [
                JwtModule.register(jwtOptions),
            ],
        };
    }
}