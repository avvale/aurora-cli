import { IamMaxAccountQuery } from '@app/iam/account';
import { IamMaxAccountService } from '@app/iam/account/application/max/iam-max-account.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamMaxAccountQuery)
export class IamMaxAccountQueryHandler implements IQueryHandler<IamMaxAccountQuery>
{
    constructor(
        private readonly maxAccountService: IamMaxAccountService,
    ) {}

    async execute(query: IamMaxAccountQuery): Promise<number>
    {
        return await this.maxAccountService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
