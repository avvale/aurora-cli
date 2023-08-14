import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamUserResponse } from '../../domain/iam-user.response';
import { IamUserMapper } from '../../domain/iam-user.mapper';
import { IamFindUserQuery } from './iam-find-user.query';
import { IamFindUserService } from './iam-find-user.service';

@QueryHandler(IamFindUserQuery)
export class IamFindUserQueryHandler implements IQueryHandler<IamFindUserQuery>
{
    private readonly mapper: IamUserMapper = new IamUserMapper();

    constructor(
        private readonly findUserService: IamFindUserService,
    ) {}

    async execute(query: IamFindUserQuery): Promise<IamUserResponse>
    {
        const user = await this.findUserService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(user);
    }
}
