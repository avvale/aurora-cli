import { IamAccountMapper, IamAccountResponse, IamGetAccountsQuery } from '@app/iam/account';
import { IamGetAccountsService } from '@app/iam/account/application/get/iam-get-accounts.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamGetAccountsQuery)
export class IamGetAccountsQueryHandler implements IQueryHandler<IamGetAccountsQuery>
{
    private readonly mapper: IamAccountMapper = new IamAccountMapper();

    constructor(
        private readonly getAccountsService: IamGetAccountsService,
    ) {}

    async execute(query: IamGetAccountsQuery): Promise<IamAccountResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getAccountsService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}
