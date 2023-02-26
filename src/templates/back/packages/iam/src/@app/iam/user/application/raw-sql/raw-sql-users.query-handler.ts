import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserResponse } from '../../domain/user.response';
import { UserMapper } from '../../domain/user.mapper';
import { RawSQLUsersQuery } from './raw-sql-users.query';
import { RawSQLUsersService } from './raw-sql-users.service';

@QueryHandler(RawSQLUsersQuery)
export class RawSQLUsersQueryHandler implements IQueryHandler<RawSQLUsersQuery>
{
    private readonly mapper: UserMapper = new UserMapper();

    constructor(
        private readonly rawSQLUsersService: RawSQLUsersService,
    ) {}

    async execute(query: RawSQLUsersQuery): Promise<UserResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLUsersService.main(query.rawSQL, query.cQMetadata));
    }
}