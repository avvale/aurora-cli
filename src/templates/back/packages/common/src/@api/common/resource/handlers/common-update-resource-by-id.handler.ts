import { CommonResourceDto, CommonUpdateResourceByIdDto } from '@api/common/resource';
import { CommonResource, CommonUpdateResourceByIdInput } from '@api/graphql';
import { CommonFindResourceByIdQuery, CommonUpdateResourceByIdCommand } from '@app/common/resource';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUpdateResourceByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonUpdateResourceByIdInput | CommonUpdateResourceByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonResource | CommonResourceDto>
    {
        const resource = await this.queryBus.ask(new CommonFindResourceByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, resource);

        await this.commandBus.dispatch(new CommonUpdateResourceByIdCommand(
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

        return await this.queryBus.ask(new CommonFindResourceByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
