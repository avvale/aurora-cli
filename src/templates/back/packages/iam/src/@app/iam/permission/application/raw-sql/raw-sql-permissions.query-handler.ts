import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PermissionResponse } from '../../domain/permission.response';
import { PermissionMapper } from '../../domain/permission.mapper';
import { RawSQLPermissionsQuery } from './raw-sql-permissions.query';
import { RawSQLPermissionsService } from './raw-sql-permissions.service';

@QueryHandler(RawSQLPermissionsQuery)
export class RawSQLPermissionsQueryHandler implements IQueryHandler<RawSQLPermissionsQuery>
{
    private readonly mapper: PermissionMapper = new PermissionMapper();

    constructor(
        private readonly rawSQLPermissionsService: RawSQLPermissionsService,
    ) {}

    async execute(query: RawSQLPermissionsQuery): Promise<PermissionResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLPermissionsService.main(query.rawSQL, query.cQMetadata));
    }
}