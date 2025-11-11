import {
    IamGetUsersQuery,
    IamUser,
    IamUserMapper,
    IamUserResponse,
} from '@app/iam/user';
import { IamGetUsersService } from '@app/iam/user/application/get/iam-get-users.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamGetUsersQuery)
export class IamGetUsersQueryHandler
    implements IQueryHandler<IamGetUsersQuery>
{
    private readonly mapper: IamUserMapper = new IamUserMapper();

    constructor(private readonly getUsersService: IamGetUsersService) {}

    async execute(
        query: IamGetUsersQuery,
    ): Promise<IamUserResponse[] | LiteralObject[]> {
        const models = await this.getUsersService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        if (query.cQMetadata?.excludeMapModelToAggregate) return models;

        return this.mapper.mapAggregatesToResponses(models as IamUser[]);
    }
}
