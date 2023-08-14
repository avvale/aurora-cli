import { CommonResourceDto, CommonUpdateResourceByIdDto } from '@api/common/resource';
import { CommonResource, CommonUpdateResourceByIdInput } from '@api/graphql';
import { CommonFindResourceByIdQuery, CommonUpsertResourceCommand } from '@app/common/resource';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUpsertResourceHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonUpdateResourceByIdInput | CommonUpdateResourceByIdDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonResource | CommonResourceDto>
    {
        await this.commandBus.dispatch(new CommonUpsertResourceCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new CommonFindResourceByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
