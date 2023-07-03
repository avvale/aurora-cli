import { CommonAdministrativeAreaLevel1Dto, CommonCreateAdministrativeAreaLevel1Dto } from '@api/common/administrative-area-level-1';
import { CommonAdministrativeAreaLevel1, CommonCreateAdministrativeAreaLevel1Input } from '@api/graphql';
import { CommonCreateAdministrativeAreaLevel1Command, CommonFindAdministrativeAreaLevel1ByIdQuery } from '@app/common/administrative-area-level-1';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonCreateAdministrativeAreaLevel1Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonCreateAdministrativeAreaLevel1Input | CommonCreateAdministrativeAreaLevel1Dto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonAdministrativeAreaLevel1 | CommonAdministrativeAreaLevel1Dto>
    {
        await this.commandBus.dispatch(new CommonCreateAdministrativeAreaLevel1Command(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new CommonFindAdministrativeAreaLevel1ByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}