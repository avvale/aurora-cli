import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserResponse } from '../../domain/user.response';
import { UserMapper } from '../../domain/user.mapper';
import { GetUsersQuery } from './get-users.query';
import { GetUsersService } from './get-users.service';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery>
{
    private readonly mapper: UserMapper = new UserMapper();

    constructor(
        private readonly getUsersService: GetUsersService,
    ) {}

    async execute(query: GetUsersQuery): Promise<UserResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getUsersService.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}