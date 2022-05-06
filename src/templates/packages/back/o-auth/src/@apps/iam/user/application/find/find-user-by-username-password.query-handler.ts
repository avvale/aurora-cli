import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserResponse } from '../../domain/user.response';
import { UserMapper } from '../../domain/user.mapper';
import { UserUsername, UserPassword } from '../../domain/value-objects';
import { FindUserByUsernamePasswordQuery } from './find-user-by-username-password.query';
import { FindUserByUsernamePasswordService } from './find-user-by-username-password.service';

@QueryHandler(FindUserByUsernamePasswordQuery)
export class FindUserByUsernamePasswordQueryHandler implements IQueryHandler<FindUserByUsernamePasswordQuery>
{
    private readonly mapper: UserMapper = new UserMapper();

    constructor(
        private readonly findUserByUsernamePasswordService: FindUserByUsernamePasswordService,
    ) { }

    async execute(query: FindUserByUsernamePasswordQuery): Promise<UserResponse>
    {
        const user = await this.findUserByUsernamePasswordService.main(
            new UserUsername(query.username),
            new UserPassword(query.password),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(user);
    }
}