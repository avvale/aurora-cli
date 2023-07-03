import { CommonCreateAdministrativeAreaLevel3Dto } from '@api/common/administrative-area-level-3';
import { CommonCreateAdministrativeAreaLevel3Input } from '@api/graphql';
import { CommonCreateAdministrativeAreasLevel3Command } from '@app/common/administrative-area-level-3';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonCreateAdministrativeAreasLevel3Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: CommonCreateAdministrativeAreaLevel3Input[] | CommonCreateAdministrativeAreaLevel3Dto[],
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CommonCreateAdministrativeAreasLevel3Command(
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