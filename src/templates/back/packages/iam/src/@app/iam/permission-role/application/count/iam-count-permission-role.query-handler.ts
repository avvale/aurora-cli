import { IamCountPermissionRoleQuery } from '@app/iam/permission-role';
import { IamCountPermissionRoleService } from '@app/iam/permission-role/application/count/iam-count-permission-role.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamCountPermissionRoleQuery)
export class IamCountPermissionRoleQueryHandler implements IQueryHandler<IamCountPermissionRoleQuery>
{
    constructor(
        private readonly countPermissionRoleService: IamCountPermissionRoleService,
    ) {}

    async execute(query: IamCountPermissionRoleQuery): Promise<number>
    {
        return await this.countPermissionRoleService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
