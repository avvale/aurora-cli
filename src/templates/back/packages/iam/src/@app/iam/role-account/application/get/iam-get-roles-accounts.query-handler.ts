import {
    IamGetRolesAccountsQuery,
    IamRoleAccount,
    IamRoleAccountMapper,
    IamRoleAccountResponse,
} from '@app/iam/role-account';
import { IamGetRolesAccountsService } from '@app/iam/role-account/application/get/iam-get-roles-accounts.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamGetRolesAccountsQuery)
export class IamGetRolesAccountsQueryHandler
    implements IQueryHandler<IamGetRolesAccountsQuery>
{
    private readonly mapper: IamRoleAccountMapper = new IamRoleAccountMapper();

    constructor(
        private readonly getRolesAccountsService: IamGetRolesAccountsService,
    ) {}

    async execute(
        query: IamGetRolesAccountsQuery,
    ): Promise<IamRoleAccountResponse[] | LiteralObject[]> {
        const models = await this.getRolesAccountsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        if (query.cQMetadata?.excludeMapModelToAggregate) return models;

        return this.mapper.mapAggregatesToResponses(models as IamRoleAccount[]);
    }
}
