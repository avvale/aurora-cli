import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamUserResponse } from '../../domain/iam-user.response';
import { IamUserMapper } from '../../domain/iam-user.mapper';
import { IamGetUsersQuery } from './iam-get-users.query';
import { IamGetUsersService } from './iam-get-users.service';

@QueryHandler(IamGetUsersQuery)
export class IamGetUsersQueryHandler implements IQueryHandler<IamGetUsersQuery>
{
    private readonly mapper: IamUserMapper = new IamUserMapper();

    constructor(
        private readonly getUsersService: IamGetUsersService,
    ) {}

    async execute(query: IamGetUsersQuery): Promise<IamUserResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getUsersService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
