import { ToolsCreateWebhookInput } from '@api/graphql';
import { ToolsCreateWebhookDto } from '@api/tools/webhook';
import { ToolsCreateWebhooksCommand } from '@app/tools/webhook';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsCreateWebhooksHandler {
    constructor(private readonly commandBus: ICommandBus) {}

    async main(
        payload: ToolsCreateWebhookInput[] | ToolsCreateWebhookDto[],
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean> {
        await this.commandBus.dispatch(
            new ToolsCreateWebhooksCommand(payload, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return true;
    }
}
