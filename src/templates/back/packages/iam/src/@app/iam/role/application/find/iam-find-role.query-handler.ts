import {
    IamFindRoleQuery,
    IamRoleMapper,
    IamRoleResponse,
} from '@app/iam/role';
import { IamFindRoleService } from '@app/iam/role/application/find/iam-find-role.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamFindRoleQuery)
export class IamFindRoleQueryHandler
    implements IQueryHandler<IamFindRoleQuery>
{
    private readonly mapper: IamRoleMapper = new IamRoleMapper();

    constructor(private readonly findRoleService: IamFindRoleService) {}

    async execute(query: IamFindRoleQuery): Promise<IamRoleResponse> {
        const role = await this.findRoleService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(role);
    }
}
