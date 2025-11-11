import { ToolsCreateProcedureInput } from '@api/graphql';
import { ToolsCreateProcedureDto } from '@api/tools/procedure';
import { ToolsCreateProceduresCommand } from '@app/tools/procedure';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsCreateProceduresHandler {
    constructor(private readonly commandBus: ICommandBus) {}

    async main(
        payload: ToolsCreateProcedureInput[] | ToolsCreateProcedureDto[],
        timezone?: string,
    ): Promise<boolean> {
        await this.commandBus.dispatch(
            new ToolsCreateProceduresCommand(
            payload
                .map(procedure => ({
                    ...procedure,
                    isExecuted: false,
                })),
            {
                timezone,
            }),
        );

        return true;
    }
}
