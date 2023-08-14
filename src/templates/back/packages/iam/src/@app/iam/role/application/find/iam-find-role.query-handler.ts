import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamRoleResponse } from '../../domain/iam-role.response';
import { IamRoleMapper } from '../../domain/iam-role.mapper';
import { IamFindRoleQuery } from './iam-find-role.query';
import { IamFindRoleService } from './iam-find-role.service';

@QueryHandler(IamFindRoleQuery)
export class IamFindRoleQueryHandler implements IQueryHandler<IamFindRoleQuery>
{
    private readonly mapper: IamRoleMapper = new IamRoleMapper();

    constructor(
        private readonly findRoleService: IamFindRoleService,
    ) {}

    async execute(query: IamFindRoleQuery): Promise<IamRoleResponse>
    {
        const role = await this.findRoleService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(role);
    }
}
