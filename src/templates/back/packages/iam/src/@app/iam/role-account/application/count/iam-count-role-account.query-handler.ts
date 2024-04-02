import { IamCountRoleAccountQuery } from '@app/iam/role-account';
import { IamCountRoleAccountService } from '@app/iam/role-account/application/count/iam-count-role-account.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamCountRoleAccountQuery)
export class IamCountRoleAccountQueryHandler implements IQueryHandler<IamCountRoleAccountQuery>
{
    constructor(
        private readonly countRoleAccountService: IamCountRoleAccountService,
    ) {}

    async execute(query: IamCountRoleAccountQuery): Promise<number>
    {
        return await this.countRoleAccountService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
