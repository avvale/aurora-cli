import { MessageMessage, MessageUpdateMessageByIdInput } from '@api/graphql';
import { MessageMessageDto, MessageUpdateMessageByIdDto } from '@api/message/message';
import { countTotalRecipients } from '@api/message/shared';
import { StorageAccountFileManagerService } from '@api/storage-account/file-manager';
import { IamAccountResponse } from '@app/iam/account';
import { MessageFindMessageByIdQuery, MessageUpdateMessageByIdCommand } from '@app/message/message';
import { AuditingMeta, diff, ICommandBus, IQueryBus, QueryStatement, uuid } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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

        const dataToUpdate = diff(payload, message);

        if ('tenantRecipientIds' in dataToUpdate) dataToUpdate.tenantRecipientIds = payload.tenantRecipientIds;
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
