import { AuditingMeta, ICommandBus, IQueryBus, uuid } from '@aurorajs.dev/core';
import { countTotalRecipients } from './count-total-recipients.function';
import { ModuleRef } from '@nestjs/core';
import { MessageCreateMessageInput, MessageMessageStatus } from '@api/graphql';
import { MessageCreateMessageDto } from '@api/message/message';
import { StorageAccountFileManagerService } from '@api/storage-account/file-manager';
import { MessageCreateMessageCommand } from '@app/message/message';

export const createMessage = async (
    {
        moduleRef,
        payload,
        relativePathSegments = ['aurora', 'message', 'attachments'],
        timezone,
        auditing,
    }: {
        moduleRef: ModuleRef;
        payload: MessageCreateMessageInput | MessageCreateMessageDto;
        relativePathSegments?: string[];
        timezone?: string;
        auditing?: AuditingMeta;
    },
): Promise<void> =>
{
    const queryBus = moduleRef.get(IQueryBus, { strict: false });
    const commandBus = moduleRef.get(ICommandBus, { strict: false });
    const storageAccountFileManagerService = moduleRef.get(StorageAccountFileManagerService, { strict: false });

    const attachments = Array.isArray(payload.attachmentsInputFile) ?
        await Promise.all(
            payload.attachmentsInputFile
                .map(
                    async attachmentInputFile => await storageAccountFileManagerService.uploadFile({
                        id  : uuid(),
                        file: attachmentInputFile,
                        relativePathSegments,
                    }),
                ),
        ) : [];

    const totalRecipients = await countTotalRecipients({
        queryBus,
        tenantRecipientIds : payload.tenantRecipientIds,
        scopeRecipients    : payload.scopeRecipients,
        tagRecipients      : payload.tagRecipients,
        accountRecipientIds: payload.accountRecipientIds,
    });

    await commandBus.dispatch(new MessageCreateMessageCommand(
        {
            ...payload,
            attachments,
            totalRecipients,
            reads : 0,
            status: MessageMessageStatus.DRAFT,
        },
        {
            timezone,
            repositoryOptions: {
                auditing,
            },
        },
    ));
};