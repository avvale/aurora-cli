import { IamCountPermissionQuery } from '@app/iam/permission';
import { IamCountPermissionService } from '@app/iam/permission/application/count/iam-count-permission.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamCountPermissionQuery)
export class IamCountPermissionQueryHandler implements IQueryHandler<IamCountPermissionQuery>
{
    constructor(
        private readonly countPermissionService: IamCountPermissionService,
    ) {}

    async execute(query: IamCountPermissionQuery): Promise<number>
    {
        return await this.countPermissionService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
