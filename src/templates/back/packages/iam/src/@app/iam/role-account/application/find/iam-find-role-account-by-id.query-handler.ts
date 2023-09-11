import { IamFindRoleAccountByIdQuery, IamRoleAccountMapper, IamRoleAccountResponse } from '@app/iam/role-account';
import { IamFindRoleAccountByIdService } from '@app/iam/role-account/application/find/iam-find-role-account-by-id.service';
import { IamRoleAccountAccountId, IamRoleAccountRoleId } from '@app/iam/role-account/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamFindRoleAccountByIdQuery)
export class IamFindRoleAccountByIdQueryHandler implements IQueryHandler<IamFindRoleAccountByIdQuery>
{
    private readonly mapper: IamRoleAccountMapper = new IamRoleAccountMapper();

    constructor(
        private readonly findRoleAccountByIdService: IamFindRoleAccountByIdService,
    ) {}

    async execute(query: IamFindRoleAccountByIdQuery): Promise<IamRoleAccountResponse>
    {
        const roleAccount = await this.findRoleAccountByIdService.main(
            new IamRoleAccountRoleId(query.roleId),
            new IamRoleAccountAccountId(query.accountId),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(roleAccount);
    }
}
