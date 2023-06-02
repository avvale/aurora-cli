import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';

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
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateLangsCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));
        return true;
    }
}