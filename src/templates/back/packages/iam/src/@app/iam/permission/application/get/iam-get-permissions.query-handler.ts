import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamPermissionResponse } from '../../domain/iam-permission.response';
import { IamPermissionMapper } from '../../domain/iam-permission.mapper';
import { IamGetPermissionsQuery } from './iam-get-permissions.query';
import { IamGetPermissionsService } from './iam-get-permissions.service';

@QueryHandler(IamGetPermissionsQuery)
export class IamGetPermissionsQueryHandler implements IQueryHandler<IamGetPermissionsQuery>
{
    private readonly mapper: IamPermissionMapper = new IamPermissionMapper();

    constructor(
        private readonly getPermissionsService: IamGetPermissionsService,
    ) {}

    async execute(query: IamGetPermissionsQuery): Promise<IamPermissionResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getPermissionsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
