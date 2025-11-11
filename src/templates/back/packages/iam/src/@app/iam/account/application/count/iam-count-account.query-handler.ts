import { IamCountAccountQuery } from '@app/iam/account';
import { IamCountAccountService } from '@app/iam/account/application/count/iam-count-account.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamCountAccountQuery)
export class IamCountAccountQueryHandler
    implements IQueryHandler<IamCountAccountQuery>
{
    constructor(private readonly countAccountService: IamCountAccountService) {}

    async execute(query: IamCountAccountQuery): Promise<number> {
        return await this.countAccountService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
