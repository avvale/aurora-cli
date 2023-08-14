import { CommonCreateAdministrativeAreaLevel2Dto } from '@api/common/administrative-area-level-2';
import { CommonCreateAdministrativeAreaLevel2Input } from '@api/graphql';
import { CommonCreateAdministrativeAreasLevel2Command } from '@app/common/administrative-area-level-2';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonCreateAdministrativeAreasLevel2Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: CommonCreateAdministrativeAreaLevel2Input[] | CommonCreateAdministrativeAreaLevel2Dto[],
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CommonCreateAdministrativeAreasLevel2Command(
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
