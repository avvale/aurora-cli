import { CommonAdministrativeAreaLevel2Dto, CommonUpdateAdministrativeAreasLevel2Dto } from '@api/common/administrative-area-level-2';
import { CommonAdministrativeAreaLevel2, CommonUpdateAdministrativeAreasLevel2Input } from '@api/graphql';
import { CommonGetAdministrativeAreasLevel2Query, CommonUpdateAdministrativeAreasLevel2Command } from '@app/common/administrative-area-level-2';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUpdateAdministrativeAreasLevel2Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonUpdateAdministrativeAreasLevel2Input | CommonUpdateAdministrativeAreasLevel2Dto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonAdministrativeAreaLevel2 | CommonAdministrativeAreaLevel2Dto>
    {
        await this.commandBus.dispatch(new CommonUpdateAdministrativeAreasLevel2Command(
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

        return await this.queryBus.ask(new CommonGetAdministrativeAreasLevel2Query(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}