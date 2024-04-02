import { IamMaxPermissionQuery } from '@app/iam/permission';
import { IamMaxPermissionService } from '@app/iam/permission/application/max/iam-max-permission.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamMaxPermissionQuery)
export class IamMaxPermissionQueryHandler implements IQueryHandler<IamMaxPermissionQuery>
{
    constructor(
        private readonly maxPermissionService: IamMaxPermissionService,
    ) {}

    async execute(query: IamMaxPermissionQuery): Promise<number>
    {
        return await this.maxPermissionService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
