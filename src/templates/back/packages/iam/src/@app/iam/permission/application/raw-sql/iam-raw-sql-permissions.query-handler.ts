import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamPermissionResponse } from '../../domain/iam-permission.response';
import { IamPermissionMapper } from '../../domain/iam-permission.mapper';
import { IamRawSQLPermissionsQuery } from './iam-raw-sql-permissions.query';
import { IamRawSQLPermissionsService } from './iam-raw-sql-permissions.service';

@QueryHandler(IamRawSQLPermissionsQuery)
export class IamRawSQLPermissionsQueryHandler implements IQueryHandler<IamRawSQLPermissionsQuery>
{
    private readonly mapper: IamPermissionMapper = new IamPermissionMapper();

    constructor(
        private readonly rawSQLPermissionsService: IamRawSQLPermissionsService,
    ) {}

    async execute(query: IamRawSQLPermissionsQuery): Promise<IamPermissionResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLPermissionsService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
