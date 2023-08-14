import { CommonAdministrativeAreaLevel1Dto } from '@api/common/administrative-area-level-1';
import { CommonAdministrativeAreaLevel1 } from '@api/graphql';
import { CommonDeleteAdministrativeAreasLevel1Command, CommonGetAdministrativeAreasLevel1Query } from '@app/common/administrative-area-level-1';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonDeleteAdministrativeAreasLevel1Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonAdministrativeAreaLevel1[] | CommonAdministrativeAreaLevel1Dto[]>
    {
        const administrativeAreasLevel1 = await this.queryBus.ask(new CommonGetAdministrativeAreasLevel1Query(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new CommonDeleteAdministrativeAreasLevel1Command(
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return administrativeAreasLevel1;
    }
}
