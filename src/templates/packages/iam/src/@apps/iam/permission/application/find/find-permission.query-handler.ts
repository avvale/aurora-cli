import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PermissionResponse } from '../../domain/permission.response';
import { PermissionMapper } from '../../domain/permission.mapper';
import { FindPermissionQuery } from './find-permission.query';
import { FindPermissionService } from './find-permission.service';

@QueryHandler(FindPermissionQuery)
export class FindPermissionQueryHandler implements IQueryHandler<FindPermissionQuery>
{
    private readonly mapper: PermissionMapper = new PermissionMapper();

    constructor(
        private readonly findPermissionService: FindPermissionService,
    ) {}

    async execute(query: FindPermissionQuery): Promise<PermissionResponse>
    {
        const permission = await this.findPermissionService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(permission);
    }
}