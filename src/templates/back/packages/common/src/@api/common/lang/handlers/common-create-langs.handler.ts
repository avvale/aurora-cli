import { Injectable } from '@nestjs/common';
import { ICommandBus } from '@aurorajs.dev/core';

// @app
import { CreateLangsCommand } from '@app/common/lang/application/create/create-langs.command';
import { CommonCreateLangInput } from '@api/graphql';
import { CommonCreateLangDto } from '../dto';

@Injectable()
export class CommonCreateLangsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: CommonCreateLangInput[] | CommonCreateLangDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateLangsCommand(payload, { timezone }));
        return true;
    }
}