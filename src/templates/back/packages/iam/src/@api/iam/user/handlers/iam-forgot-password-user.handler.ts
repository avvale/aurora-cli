import { IamForgotPasswordUserInput } from '@api/graphql';
import { IamFindAccountQuery } from '@app/iam/account';
import { IamUpdateUsersCommand } from '@app/iam/user';
import { AuditingMeta, ICommandBus, IQueryBus, now, Operator, uuid } from '@aurorajs.dev/core';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { join } from 'node:path';
import { IamForgotPasswordUserDto } from '../dto';
import { coreLangs } from '@aurora/modules/lang';
import { I18nService } from 'nestjs-i18n';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IamForgotPasswordUserHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly mailerService: MailerService,
        private readonly i18nService: I18nService,
        private readonly configService: ConfigService,
    ) {}

    async main(
        payload: IamForgotPasswordUserInput | IamForgotPasswordUserDto,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        const account = await this.queryBus.ask(new IamFindAccountQuery(
            {
                where: {
                    [Operator.or]: [
                        { email: payload.email },
                        { username: payload.email },
                    ],
                },
            },
            {
                include: [
                    {
                        association: 'user',
                    },
                ],
            },
        ));

        // find user's language
        const lang = coreLangs.find(lang => lang.id === account.user.langId);

        const rememberToken = btoa(account.id + now().format('YYYYMMDDHHmmss') + uuid());

        await this.commandBus.dispatch(new IamUpdateUsersCommand(
            {
                rememberToken,
            },
            {
                where: {
                    accountId: account.id,
                },
            },
        ));

        this.mailerService
            .sendMail({
                to      : account.email,
                subject : this.i18nService.t('iam.PasswordRecovery', { lang: lang?.iso6392 }),
                template: join(process.cwd(), 'src', 'assets', 'email', 'templates', 'forgot-password'), // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
                context : {
                    lang       : lang?.iso6392,
                    link       : `${payload.origin}/reset-password/${rememberToken}`,
                    projectName: this.configService.get<string>('APP_NAME', 'Aurora'),
                    username   : account.username,
                    email      : account.email,
                    validHours : 1,
                },
            })
            .then(data =>
            {
                Logger.log(`[assignedDriverNotification] Mailer for assigned driver for transport , data: ${data}`, 'IamForgotPasswordUserHandler');
            })
            .catch(error =>
            {
                Logger.error(`[assignedDriverNotification] Error mailer, Error: ${error}`, 'IamForgotPasswordUserHandler');
            });

        return true;
    }
}