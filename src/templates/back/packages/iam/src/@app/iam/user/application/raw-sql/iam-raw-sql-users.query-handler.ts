import { IamRawSQLUsersQuery, IamUserMapper, IamUserResponse } from '@app/iam/user';
import { IamRawSQLUsersService } from '@app/iam/user/application/raw-sql/iam-raw-sql-users.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamRawSQLUsersQuery)
export class IamRawSQLUsersQueryHandler implements IQueryHandler<IamRawSQLUsersQuery>
{
    private readonly mapper: IamUserMapper = new IamUserMapper();

    constructor(
        private readonly rawSQLUsersService: IamRawSQLUsersService,
    ) {}

    async execute(query: IamRawSQLUsersQuery): Promise<IamUserResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLUsersService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
