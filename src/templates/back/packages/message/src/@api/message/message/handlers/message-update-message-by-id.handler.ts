import { MessageMessage, MessageMessageStatus, MessageUpdateMessageByIdInput } from '@api/graphql';
import { MessageMessageDto, MessageUpdateMessageByIdDto } from '@api/message/message';
import { countTotalRecipients } from '@api/message/shared';
import { StorageAccountFileManagerService } from '@api/storage-account/file-manager';
import { IamAccountResponse } from '@app/iam/account';
import { MessageFindMessageByIdQuery, MessageUpdateMessageByIdCommand } from '@app/message/message';
import { AuditingMeta, diff, ICommandBus, IQueryBus, QueryStatement, uuid } from '@aurorajs.dev/core';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class MessageUpdateMessageByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly storageAccountFileManagerService: StorageAccountFileManagerService,
    ) {}

    async main(
        account: IamAccountResponse,
        payload: MessageUpdateMessageByIdInput | MessageUpdateMessageByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<MessageMessage | MessageMessageDto>
    {
        const message = await this.queryBus.ask(new MessageFindMessageByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        if (message.status === MessageMessageStatus.SENT) throw new BadRequestException('Messages that have been sent cannot be modified.');

        const dataToUpdate = diff(payload, message);

        if ('tenantRecipientIds' in dataToUpdate)
        {
            // At a minimum, it must have the tenants of the account that is creating the message.
            // We only set tenantIds if they are not included in the payload and if there are no
            // account or tenant recipients in the payload.
            // If there are recipient accounts, the message-check-messages-inbox.handler.ts process
            // filters them and only if there are no tenants but there are recipient accounts, it is sent to those accounts.
            dataToUpdate.tenantRecipientIds = (

                (
                    !Array.isArray(payload.tenantRecipientIds) ||
                    payload.tenantRecipientIds.length === 0
                )
                &&
                (
                    !Array.isArray(payload.accountRecipientIds) ||
                    payload.accountRecipientIds.length === 0
                )
            ) ?
                payload.tenantRecipientIds = account.dTenants :
                payload.tenantRecipientIds;
        }

        if ('scopeRecipients' in dataToUpdate) dataToUpdate.scopeRecipients = payload.scopeRecipients;
        if ('tagRecipients' in dataToUpdate) dataToUpdate.tagRecipients = payload.tagRecipients;
        if (
            'tenantRecipientIds' in dataToUpdate ||
            'scopeRecipients' in dataToUpdate ||
            'tagRecipients' in dataToUpdate ||
            'accountRecipientIds' in dataToUpdate
        )
        {
            dataToUpdate.totalRecipients = await countTotalRecipients({
                queryBus           : this.queryBus,
                tenantRecipientIds : payload.tenantRecipientIds,
                scopeRecipients    : payload.scopeRecipients,
                tagRecipients      : payload.tagRecipients,
                accountRecipientIds: payload.accountRecipientIds,
            });
        }

        if ('accountRecipientIds' in dataToUpdate)
        {
            dataToUpdate.accountRecipientIds = payload.accountRecipientIds;
        }

        const attachments = Array.isArray(payload.attachmentsInputFile) ?
            await Promise.all(
                payload.attachmentsInputFile
                    .map(
                        async attachmentInputFile => await this.storageAccountFileManagerService.uploadFile({
                            id                  : uuid(),
                            file                : attachmentInputFile,
                            relativePathSegments: ['aurora', 'message', 'attachments'],
                        }),
                    ),
            ) : [];

        await this.commandBus.dispatch(new MessageUpdateMessageByIdCommand(
            {
                ...dataToUpdate,
                attachments: [...message.attachments, ...attachments],
                id         : payload.id,
            },
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new MessageFindMessageByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
