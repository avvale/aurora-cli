import { CommonAdministrativeAreaLevel3Dto } from '@api/common/administrative-area-level-3';
import { CommonAdministrativeAreaLevel3 } from '@api/graphql';
import { CommonDeleteAdministrativeAreaLevel3ByIdCommand, CommonFindAdministrativeAreaLevel3ByIdQuery } from '@app/common/administrative-area-level-3';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonDeleteAdministrativeAreaLevel3ByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonAdministrativeAreaLevel3 | CommonAdministrativeAreaLevel3Dto>
    {
        const administrativeAreaLevel3 = await this.queryBus.ask(new CommonFindAdministrativeAreaLevel3ByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new CommonDeleteAdministrativeAreaLevel3ByIdCommand(
            id,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return administrativeAreaLevel3;
    }
}
