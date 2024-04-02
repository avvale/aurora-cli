import { IamMinRoleAccountQuery } from '@app/iam/role-account';
import { IamMinRoleAccountService } from '@app/iam/role-account/application/min/iam-min-role-account.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamMinRoleAccountQuery)
export class IamMinRoleAccountQueryHandler implements IQueryHandler<IamMinRoleAccountQuery>
{
    constructor(
        private readonly minRoleAccountService: IamMinRoleAccountService,
    ) {}

    async execute(query: IamMinRoleAccountQuery): Promise<number>
    {
        return await this.minRoleAccountService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
