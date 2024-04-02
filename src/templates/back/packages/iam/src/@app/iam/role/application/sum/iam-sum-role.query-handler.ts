import { IamSumRoleQuery } from '@app/iam/role';
import { IamSumRoleService } from '@app/iam/role/application/sum/iam-sum-role.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamSumRoleQuery)
export class IamSumRoleQueryHandler implements IQueryHandler<IamSumRoleQuery>
{
    constructor(
        private readonly sumRoleService: IamSumRoleService,
    ) {}

    async execute(query: IamSumRoleQuery): Promise<number>
    {
        return await this.sumRoleService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
