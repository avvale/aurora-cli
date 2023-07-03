import { CommonCreateAdministrativeAreaLevel1Dto } from '@api/common/administrative-area-level-1';
import { CommonCreateAdministrativeAreaLevel1Input } from '@api/graphql';
import { CommonCreateAdministrativeAreasLevel1Command } from '@app/common/administrative-area-level-1';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonCreateAdministrativeAreasLevel1Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: CommonCreateAdministrativeAreaLevel1Input[] | CommonCreateAdministrativeAreaLevel1Dto[],
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CommonCreateAdministrativeAreasLevel1Command(
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