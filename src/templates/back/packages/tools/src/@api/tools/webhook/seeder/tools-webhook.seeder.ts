import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//
import {
    ToolsCreateWebhooksCommand,
    toolsMockWebhookData,
} from '@app/tools/webhook';

@Injectable()
export class ToolsWebhookSeeder {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean> {
        await this.commandBus.dispatch(
            new ToolsCreateWebhooksCommand(toolsMockWebhookData, {
                timezone: process.env.TZ,
            }),
        );

        return true;
    }
}
