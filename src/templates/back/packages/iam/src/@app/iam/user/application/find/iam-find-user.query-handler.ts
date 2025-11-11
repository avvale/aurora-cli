import {
    IamFindUserQuery,
    IamUserMapper,
    IamUserResponse,
} from '@app/iam/user';
import { IamFindUserService } from '@app/iam/user/application/find/iam-find-user.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamFindUserQuery)
export class IamFindUserQueryHandler
    implements IQueryHandler<IamFindUserQuery>
{
    private readonly mapper: IamUserMapper = new IamUserMapper();

    constructor(private readonly findUserService: IamFindUserService) {}

    async execute(query: IamFindUserQuery): Promise<IamUserResponse> {
        const user = await this.findUserService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(user);
    }
}
