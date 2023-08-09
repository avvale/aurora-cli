import { CommonAdministrativeAreaLevel3Dto } from '@api/common/administrative-area-level-3';
import { CommonAdministrativeAreaLevel3 } from '@api/graphql';
import { CommonDeleteAdministrativeAreasLevel3Command, CommonGetAdministrativeAreasLevel3Query } from '@app/common/administrative-area-level-3';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonDeleteAdministrativeAreasLevel3Handler
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
    ): Promise<CommonAdministrativeAreaLevel3[] | CommonAdministrativeAreaLevel3Dto[]>
    {
        const administrativeAreasLevel3 = await this.queryBus.ask(new CommonGetAdministrativeAreasLevel3Query(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new CommonDeleteAdministrativeAreasLevel3Command(
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return administrativeAreasLevel3;
    }
}
