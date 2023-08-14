import { CommonAdministrativeAreaLevel1Dto, CommonUpdateAdministrativeAreasLevel1Dto } from '@api/common/administrative-area-level-1';
import { CommonAdministrativeAreaLevel1, CommonUpdateAdministrativeAreasLevel1Input } from '@api/graphql';
import { CommonGetAdministrativeAreasLevel1Query, CommonUpdateAdministrativeAreasLevel1Command } from '@app/common/administrative-area-level-1';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUpdateAdministrativeAreasLevel1Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonUpdateAdministrativeAreasLevel1Input | CommonUpdateAdministrativeAreasLevel1Dto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonAdministrativeAreaLevel1 | CommonAdministrativeAreaLevel1Dto>
    {
        await this.commandBus.dispatch(new CommonUpdateAdministrativeAreasLevel1Command(
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

        return await this.queryBus.ask(new CommonGetAdministrativeAreasLevel1Query(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
