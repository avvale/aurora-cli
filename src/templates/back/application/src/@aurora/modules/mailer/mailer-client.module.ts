import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as handlebarsHelpers from 'handlebars-helpers';

@Module({})
export class MailerCLientModule
{
    public static forRootAsync(): DynamicModule
    {
        if (process.env.MAILER_ENABLED !== 'true')
        {
            return {
                module: MailerCLientModule,
            };
        }

        return {
            module : MailerCLientModule,
            imports: [
                /** Modules **/
                MailerModule.forRootAsync({
                    imports   : [ConfigModule],
                    inject    : [ConfigService],
                    useFactory: (configService: ConfigService) => ({
                        transport: {
                            host     : configService.get<string>('MAILER_HOST'),
                            port     : +configService.get<number>('MAILER_PORT'),
                            ignoreTLS: configService.get<string>('MAILER_IGNORE_TLS') === 'true' ? true : false,
                            secure   : configService.get<string>('MAILER_SECURE') === 'true' ? true : false,
                            auth     : {
                                user: configService.get<string>('MAILER_USER'),
                                pass: configService.get<string>('MAILER_PASSWORD'),
                            },
                        },
                        defaults: {
                            from: configService.get<string>('MAILER_FROM'),
                        },
                        template: {
                            dir    : __dirname + '/templates',
                            adapter: new HandlebarsAdapter({ ...handlebarsHelpers() }),
                            options: {
                                strict: true,
                            },
                        },
                    }),
                }),
            ],
        };
    }
}
