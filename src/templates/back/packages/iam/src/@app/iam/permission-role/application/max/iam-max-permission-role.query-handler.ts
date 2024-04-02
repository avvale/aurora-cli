import { IamMaxPermissionRoleQuery } from '@app/iam/permission-role';
import { IamMaxPermissionRoleService } from '@app/iam/permission-role/application/max/iam-max-permission-role.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamMaxPermissionRoleQuery)
export class IamMaxPermissionRoleQueryHandler implements IQueryHandler<IamMaxPermissionRoleQuery>
{
    constructor(
        private readonly maxPermissionRoleService: IamMaxPermissionRoleService,
    ) {}

    async execute(query: IamMaxPermissionRoleQuery): Promise<number>
    {
        return await this.maxPermissionRoleService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
