import { CommonAdministrativeAreaLevel3Dto, CommonUpdateAdministrativeAreaLevel3ByIdDto } from '@api/common/administrative-area-level-3';
import { CommonAdministrativeAreaLevel3, CommonUpdateAdministrativeAreaLevel3ByIdInput } from '@api/graphql';
import { CommonFindAdministrativeAreaLevel3ByIdQuery, CommonUpsertAdministrativeAreaLevel3Command } from '@app/common/administrative-area-level-3';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUpsertAdministrativeAreaLevel3Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonUpdateAdministrativeAreaLevel3ByIdInput | CommonUpdateAdministrativeAreaLevel3ByIdDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonAdministrativeAreaLevel3 | CommonAdministrativeAreaLevel3Dto>
    {
        await this.commandBus.dispatch(new CommonUpsertAdministrativeAreaLevel3Command(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new CommonFindAdministrativeAreaLevel3ByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
