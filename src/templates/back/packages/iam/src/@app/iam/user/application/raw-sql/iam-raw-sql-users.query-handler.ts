import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamUserResponse } from '../../domain/iam-user.response';
import { IamUserMapper } from '../../domain/iam-user.mapper';
import { IamRawSQLUsersQuery } from './iam-raw-sql-users.query';
import { IamRawSQLUsersService } from './iam-raw-sql-users.service';

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
