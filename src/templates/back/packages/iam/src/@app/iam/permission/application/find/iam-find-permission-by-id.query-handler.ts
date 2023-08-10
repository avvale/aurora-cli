import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamPermissionResponse } from '../../domain/iam-permission.response';
import { IamPermissionMapper } from '../../domain/iam-permission.mapper';
import { IamPermissionId } from '../../domain/value-objects';
import { IamFindPermissionByIdQuery } from './iam-find-permission-by-id.query';
import { IamFindPermissionByIdService } from './iam-find-permission-by-id.service';

@QueryHandler(IamFindPermissionByIdQuery)
export class IamFindPermissionByIdQueryHandler implements IQueryHandler<IamFindPermissionByIdQuery>
{
    private readonly mapper: IamPermissionMapper = new IamPermissionMapper();

    constructor(
        private readonly findPermissionByIdService: IamFindPermissionByIdService,
    ) {}

    async execute(query: IamFindPermissionByIdQuery): Promise<IamPermissionResponse>
    {
        const permission = await this.findPermissionByIdService.main(
            new IamPermissionId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(permission);
    }
}
