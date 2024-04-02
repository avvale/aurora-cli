import { IamSumRoleAccountQuery } from '@app/iam/role-account';
import { IamSumRoleAccountService } from '@app/iam/role-account/application/sum/iam-sum-role-account.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamSumRoleAccountQuery)
export class IamSumRoleAccountQueryHandler implements IQueryHandler<IamSumRoleAccountQuery>
{
    constructor(
        private readonly sumRoleAccountService: IamSumRoleAccountService,
    ) {}

    async execute(query: IamSumRoleAccountQuery): Promise<number>
    {
        return await this.sumRoleAccountService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
