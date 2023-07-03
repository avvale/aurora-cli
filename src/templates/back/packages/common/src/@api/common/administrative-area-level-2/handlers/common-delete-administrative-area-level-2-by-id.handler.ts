import { CommonAdministrativeAreaLevel2Dto } from '@api/common/administrative-area-level-2';
import { CommonAdministrativeAreaLevel2 } from '@api/graphql';
import { CommonDeleteAdministrativeAreaLevel2ByIdCommand, CommonFindAdministrativeAreaLevel2ByIdQuery } from '@app/common/administrative-area-level-2';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonDeleteAdministrativeAreaLevel2ByIdHandler
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
    ): Promise<CommonAdministrativeAreaLevel2 | CommonAdministrativeAreaLevel2Dto>
    {
        const administrativeAreaLevel2 = await this.queryBus.ask(new CommonFindAdministrativeAreaLevel2ByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new CommonDeleteAdministrativeAreaLevel2ByIdCommand(
            id,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return administrativeAreaLevel2;
    }
}