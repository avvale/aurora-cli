import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamPermissionResponse } from '../../domain/iam-permission.response';
import { IamPermissionMapper } from '../../domain/iam-permission.mapper';
import { IamFindPermissionQuery } from './iam-find-permission.query';
import { IamFindPermissionService } from './iam-find-permission.service';

@QueryHandler(IamFindPermissionQuery)
export class IamFindPermissionQueryHandler implements IQueryHandler<IamFindPermissionQuery>
{
    private readonly mapper: IamPermissionMapper = new IamPermissionMapper();

    constructor(
        private readonly findPermissionService: IamFindPermissionService,
    ) {}

    async execute(query: IamFindPermissionQuery): Promise<IamPermissionResponse>
    {
        const permission = await this.findPermissionService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(permission);
    }
}
