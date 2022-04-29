import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PermissionResponse } from '../../domain/permission.response';
import { PermissionMapper } from '../../domain/permission.mapper';
import { GetPermissionsQuery } from './get-permissions.query';
import { GetPermissionsService } from './get-permissions.service';

@QueryHandler(GetPermissionsQuery)
export class GetPermissionsQueryHandler implements IQueryHandler<GetPermissionsQuery>
{
    private readonly mapper: PermissionMapper = new PermissionMapper();

    constructor(
        private readonly getPermissionsService: GetPermissionsService,
    ) {}

    async execute(query: GetPermissionsQuery): Promise<PermissionResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getPermissionsService.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}