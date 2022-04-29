import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PermissionResponse } from '../../domain/permission.response';
import { PermissionMapper } from '../../domain/permission.mapper';
import { PermissionId } from '../../domain/value-objects';
import { FindPermissionByIdQuery } from './find-permission-by-id.query';
import { FindPermissionByIdService } from './find-permission-by-id.service';

@QueryHandler(FindPermissionByIdQuery)
export class FindPermissionByIdQueryHandler implements IQueryHandler<FindPermissionByIdQuery>
{
    private readonly mapper: PermissionMapper = new PermissionMapper();

    constructor(
        private readonly findPermissionByIdService: FindPermissionByIdService,
    ) {}

    async execute(query: FindPermissionByIdQuery): Promise<PermissionResponse>
    {
        const permission = await this.findPermissionByIdService.main(
            new PermissionId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(permission);
    }
}