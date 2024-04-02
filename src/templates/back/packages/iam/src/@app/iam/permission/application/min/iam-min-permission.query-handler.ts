import { IamMinPermissionQuery } from '@app/iam/permission';
import { IamMinPermissionService } from '@app/iam/permission/application/min/iam-min-permission.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamMinPermissionQuery)
export class IamMinPermissionQueryHandler implements IQueryHandler<IamMinPermissionQuery>
{
    constructor(
        private readonly minPermissionService: IamMinPermissionService,
    ) {}

    async execute(query: IamMinPermissionQuery): Promise<number>
    {
        return await this.minPermissionService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
