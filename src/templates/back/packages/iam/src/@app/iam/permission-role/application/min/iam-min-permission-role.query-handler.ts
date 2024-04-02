import { IamMinPermissionRoleQuery } from '@app/iam/permission-role';
import { IamMinPermissionRoleService } from '@app/iam/permission-role/application/min/iam-min-permission-role.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamMinPermissionRoleQuery)
export class IamMinPermissionRoleQueryHandler implements IQueryHandler<IamMinPermissionRoleQuery>
{
    constructor(
        private readonly minPermissionRoleService: IamMinPermissionRoleService,
    ) {}

    async execute(query: IamMinPermissionRoleQuery): Promise<number>
    {
        return await this.minPermissionRoleService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
