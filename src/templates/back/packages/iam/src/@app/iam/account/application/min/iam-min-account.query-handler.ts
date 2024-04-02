import { IamMinAccountQuery } from '@app/iam/account';
import { IamMinAccountService } from '@app/iam/account/application/min/iam-min-account.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamMinAccountQuery)
export class IamMinAccountQueryHandler implements IQueryHandler<IamMinAccountQuery>
{
    constructor(
        private readonly minAccountService: IamMinAccountService,
    ) {}

    async execute(query: IamMinAccountQuery): Promise<number>
    {
        return await this.minAccountService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
