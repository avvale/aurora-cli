import { IamGetPermissionsQuery, IamPermissionMapper, IamPermissionResponse } from '@app/iam/permission';
import { IamGetPermissionsService } from '@app/iam/permission/application/get/iam-get-permissions.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamGetPermissionsQuery)
export class IamGetPermissionsQueryHandler implements IQueryHandler<IamGetPermissionsQuery>
{
    private readonly mapper: IamPermissionMapper = new IamPermissionMapper();

    constructor(
        private readonly getPermissionsService: IamGetPermissionsService,
    ) {}

    async execute(query: IamGetPermissionsQuery): Promise<IamPermissionResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getPermissionsService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}
