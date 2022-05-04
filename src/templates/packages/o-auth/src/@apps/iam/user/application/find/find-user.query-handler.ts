import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserResponse } from '../../domain/user.response';
import { UserMapper } from '../../domain/user.mapper';
import { FindUserQuery } from './find-user.query';
import { FindUserService } from './find-user.service';

@QueryHandler(FindUserQuery)
export class FindUserQueryHandler implements IQueryHandler<FindUserQuery>
{
    private readonly mapper: UserMapper = new UserMapper();

    constructor(
        private readonly findUserService: FindUserService,
    ) {}

    async execute(query: FindUserQuery): Promise<UserResponse>
    {
        const user = await this.findUserService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(user);
    }
}