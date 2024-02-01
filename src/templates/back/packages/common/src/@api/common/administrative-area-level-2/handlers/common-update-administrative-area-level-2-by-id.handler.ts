import { CommonAdministrativeAreaLevel2Dto, CommonUpdateAdministrativeAreaLevel2ByIdDto } from '@api/common/administrative-area-level-2';
import { CommonAdministrativeAreaLevel2, CommonUpdateAdministrativeAreaLevel2ByIdInput } from '@api/graphql';
import { CommonFindAdministrativeAreaLevel2ByIdQuery, CommonUpdateAdministrativeAreaLevel2ByIdCommand } from '@app/common/administrative-area-level-2';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement, diff } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUpdateAdministrativeAreaLevel2ByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonUpdateAdministrativeAreaLevel2ByIdInput | CommonUpdateAdministrativeAreaLevel2ByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonAdministrativeAreaLevel2 | CommonAdministrativeAreaLevel2Dto>
    {
        const administrativeAreaLevel2 = await this.queryBus.ask(new CommonFindAdministrativeAreaLevel2ByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = diff(payload, administrativeAreaLevel2);

        await this.commandBus.dispatch(new CommonUpdateAdministrativeAreaLevel2ByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new CommonFindAdministrativeAreaLevel2ByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
