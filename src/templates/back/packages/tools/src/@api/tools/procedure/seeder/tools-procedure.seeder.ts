import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//
import {
    ToolsCreateProceduresCommand,
    toolsMockProcedureData,
} from '@app/tools/procedure';

@Injectable()
export class ToolsProcedureSeeder {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean> {
        await this.commandBus.dispatch(
            new ToolsCreateProceduresCommand(toolsMockProcedureData, {
                timezone: process.env.TZ,
            }),
        );

        return true;
    }
}
