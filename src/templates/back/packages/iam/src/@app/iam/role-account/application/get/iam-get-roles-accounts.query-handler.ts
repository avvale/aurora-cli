import { IamGetRolesAccountsQuery, IamRoleAccountMapper, IamRoleAccountResponse } from '@app/iam/role-account';
import { IamGetRolesAccountsService } from '@app/iam/role-account/application/get/iam-get-roles-accounts.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamGetRolesAccountsQuery)
export class IamGetRolesAccountsQueryHandler implements IQueryHandler<IamGetRolesAccountsQuery>
{
    private readonly mapper: IamRoleAccountMapper = new IamRoleAccountMapper();

    constructor(
        private readonly getRolesAccountsService: IamGetRolesAccountsService,
    ) {}

    async execute(query: IamGetRolesAccountsQuery): Promise<IamRoleAccountResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getRolesAccountsService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}
