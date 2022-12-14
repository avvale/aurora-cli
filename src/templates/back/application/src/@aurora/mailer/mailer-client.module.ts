import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
    imports: [
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
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
        }),
    ],
})
export class MailerCLientModule { }
