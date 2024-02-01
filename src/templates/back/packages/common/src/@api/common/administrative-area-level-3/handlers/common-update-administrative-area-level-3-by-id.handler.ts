import { CommonAdministrativeAreaLevel3Dto, CommonUpdateAdministrativeAreaLevel3ByIdDto } from '@api/common/administrative-area-level-3';
import { CommonAdministrativeAreaLevel3, CommonUpdateAdministrativeAreaLevel3ByIdInput } from '@api/graphql';
import { CommonFindAdministrativeAreaLevel3ByIdQuery, CommonUpdateAdministrativeAreaLevel3ByIdCommand } from '@app/common/administrative-area-level-3';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement, diff } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUpdateAdministrativeAreaLevel3ByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonUpdateAdministrativeAreaLevel3ByIdInput | CommonUpdateAdministrativeAreaLevel3ByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonAdministrativeAreaLevel3 | CommonAdministrativeAreaLevel3Dto>
    {
        const administrativeAreaLevel3 = await this.queryBus.ask(new CommonFindAdministrativeAreaLevel3ByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = diff(payload, administrativeAreaLevel3);

        await this.commandBus.dispatch(new CommonUpdateAdministrativeAreaLevel3ByIdCommand(
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

        return await this.queryBus.ask(new CommonFindAdministrativeAreaLevel3ByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
