import { IamMaxRoleAccountQuery } from '@app/iam/role-account';
import { IamMaxRoleAccountService } from '@app/iam/role-account/application/max/iam-max-role-account.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamMaxRoleAccountQuery)
export class IamMaxRoleAccountQueryHandler implements IQueryHandler<IamMaxRoleAccountQuery>
{
    constructor(
        private readonly maxRoleAccountService: IamMaxRoleAccountService,
    ) {}

    async execute(query: IamMaxRoleAccountQuery): Promise<number>
    {
        return await this.maxRoleAccountService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
