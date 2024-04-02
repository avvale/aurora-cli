import { IamSumPermissionRoleQuery } from '@app/iam/permission-role';
import { IamSumPermissionRoleService } from '@app/iam/permission-role/application/sum/iam-sum-permission-role.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamSumPermissionRoleQuery)
export class IamSumPermissionRoleQueryHandler implements IQueryHandler<IamSumPermissionRoleQuery>
{
    constructor(
        private readonly sumPermissionRoleService: IamSumPermissionRoleService,
    ) {}

    async execute(query: IamSumPermissionRoleQuery): Promise<number>
    {
        return await this.sumPermissionRoleService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
