import { IamSumPermissionQuery } from '@app/iam/permission';
import { IamSumPermissionService } from '@app/iam/permission/application/sum/iam-sum-permission.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamSumPermissionQuery)
export class IamSumPermissionQueryHandler implements IQueryHandler<IamSumPermissionQuery>
{
    constructor(
        private readonly sumPermissionService: IamSumPermissionService,
    ) {}

    async execute(query: IamSumPermissionQuery): Promise<number>
    {
        return await this.sumPermissionService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
