import {
    IamFindRoleAccountQuery,
    IamRoleAccountMapper,
    IamRoleAccountResponse,
} from '@app/iam/role-account';
import { IamFindRoleAccountService } from '@app/iam/role-account/application/find/iam-find-role-account.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamFindRoleAccountQuery)
export class IamFindRoleAccountQueryHandler
    implements IQueryHandler<IamFindRoleAccountQuery>
{
    private readonly mapper: IamRoleAccountMapper = new IamRoleAccountMapper();

    constructor(
        private readonly findRoleAccountService: IamFindRoleAccountService,
    ) {}

    async execute(
        query: IamFindRoleAccountQuery,
    ): Promise<IamRoleAccountResponse> {
        const roleAccount = await this.findRoleAccountService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(roleAccount);
    }
}
