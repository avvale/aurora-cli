import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamRoleResponse } from '../../domain/iam-role.response';
import { IamRoleMapper } from '../../domain/iam-role.mapper';
import { IamGetRolesQuery } from './iam-get-roles.query';
import { IamGetRolesService } from './iam-get-roles.service';

@QueryHandler(IamGetRolesQuery)
export class IamGetRolesQueryHandler implements IQueryHandler<IamGetRolesQuery>
{
    private readonly mapper: IamRoleMapper = new IamRoleMapper();

    constructor(
        private readonly getRolesService: IamGetRolesService,
    ) {}

    async execute(query: IamGetRolesQuery): Promise<IamRoleResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getRolesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
