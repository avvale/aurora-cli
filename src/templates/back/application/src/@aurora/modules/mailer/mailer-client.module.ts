import { MailerTransportService } from '@aurorajs.dev/core';
import { MailerTransportModule } from '@config/mailer';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as handlebarsHelpers from 'handlebars-helpers';
import {
    AcceptLanguageResolver,
    I18nModule,
    I18nService,
    QueryResolver,
} from 'nestjs-i18n';
import { join } from 'node:path';

const customI18nHelper = (i18nService: I18nService) => {
    return (key: string, context: any) => {
        const lang = context?.data?.root?.lang || 'en';
        const args = context?.hash || {};
        return i18nService.t(key, { lang, args });
    };
};

@Module({})
export class MailerCLientModule {
    public static forRootAsync(): DynamicModule {
        if (process.env.MAILER_ENABLED !== 'true') {
            return {
                module: MailerCLientModule,
            };
        }

        const srcPath = join(__dirname, '..', '..', '..');

        return {
            module: MailerCLientModule,
            imports: [
                I18nModule.forRoot({
                    fallbackLanguage: 'en',
                    loaderOptions: {
                        path: join(srcPath, 'i18n'),
                        watch: true,
                    },
                    resolvers: [
                        {
                            use: QueryResolver,
                            options: ['lang'],
                        },
                        AcceptLanguageResolver,
                    ],
                }),
                MailerModule.forRootAsync({
                    imports: [ConfigModule, MailerTransportModule],
                    inject: [
                        ConfigService,
                        I18nService,
                        MailerTransportService,
                    ],
                    useFactory: (
                        configService: ConfigService,
                        i18nService: I18nService,
                        mailerTransportService: MailerTransportService,
                    ) => ({
                        transport: mailerTransportService.getTransport(),
                        defaults: {
                            from: configService.get<string>('MAILER_FROM'),
                        },
                        template: {
                            dir: join(srcPath, 'assets', 'email', 'templates'),
                            adapter: new HandlebarsAdapter({
                                ...handlebarsHelpers(),
                                t: customI18nHelper(i18nService),
                            }),
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
