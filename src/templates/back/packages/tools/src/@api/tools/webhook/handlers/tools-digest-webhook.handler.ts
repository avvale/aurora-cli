import { ToolsDigestWebhookCommand } from '@app/tools/webhook';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsDigestWebhookHandler {
    constructor(private readonly commandBus: ICommandBus) {}

    async main(headers: any, payload: any): Promise<boolean> {
        await this.commandBus.dispatch(
            new ToolsDigestWebhookCommand(headers, payload),
        );

        return true;
    }
}
