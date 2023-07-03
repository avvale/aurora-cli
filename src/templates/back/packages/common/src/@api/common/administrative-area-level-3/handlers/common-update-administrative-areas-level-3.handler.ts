import { CommonAdministrativeAreaLevel3Dto, CommonUpdateAdministrativeAreasLevel3Dto } from '@api/common/administrative-area-level-3';
import { CommonAdministrativeAreaLevel3, CommonUpdateAdministrativeAreasLevel3Input } from '@api/graphql';
import { CommonGetAdministrativeAreasLevel3Query, CommonUpdateAdministrativeAreasLevel3Command } from '@app/common/administrative-area-level-3';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUpdateAdministrativeAreasLevel3Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonUpdateAdministrativeAreasLevel3Input | CommonUpdateAdministrativeAreasLevel3Dto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonAdministrativeAreaLevel3 | CommonAdministrativeAreaLevel3Dto>
    {
        await this.commandBus.dispatch(new CommonUpdateAdministrativeAreasLevel3Command(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new CommonGetAdministrativeAreasLevel3Query(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}