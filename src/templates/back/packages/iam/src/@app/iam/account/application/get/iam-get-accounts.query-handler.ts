import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamAccountResponse } from '../../domain/iam-account.response';
import { IamAccountMapper } from '../../domain/iam-account.mapper';
import { IamGetAccountsQuery } from './iam-get-accounts.query';
import { IamGetAccountsService } from './iam-get-accounts.service';

@QueryHandler(IamGetAccountsQuery)
export class IamGetAccountsQueryHandler implements IQueryHandler<IamGetAccountsQuery>
{
    private readonly mapper: IamAccountMapper = new IamAccountMapper();

    constructor(
        private readonly getAccountsService: IamGetAccountsService,
    ) {}

    async execute(query: IamGetAccountsQuery): Promise<IamAccountResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getAccountsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
