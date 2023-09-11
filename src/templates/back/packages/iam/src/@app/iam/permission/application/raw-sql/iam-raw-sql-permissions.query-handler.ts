import { IamPermissionMapper, IamPermissionResponse, IamRawSQLPermissionsQuery } from '@app/iam/permission';
import { IamRawSQLPermissionsService } from '@app/iam/permission/application/raw-sql/iam-raw-sql-permissions.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

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
