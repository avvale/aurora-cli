import {
    IamFindPermissionQuery,
    IamPermissionMapper,
    IamPermissionResponse,
} from '@app/iam/permission';
import { IamFindPermissionService } from '@app/iam/permission/application/find/iam-find-permission.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamFindPermissionQuery)
export class IamFindPermissionQueryHandler
    implements IQueryHandler<IamFindPermissionQuery>
{
    private readonly mapper: IamPermissionMapper = new IamPermissionMapper();

    constructor(
        private readonly findPermissionService: IamFindPermissionService,
    ) {}

    async execute(
        query: IamFindPermissionQuery,
    ): Promise<IamPermissionResponse> {
        const permission = await this.findPermissionService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(permission);
    }
}
