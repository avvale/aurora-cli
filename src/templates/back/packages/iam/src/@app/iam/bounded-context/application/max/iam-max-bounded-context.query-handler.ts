import { IamMaxBoundedContextQuery } from '@app/iam/bounded-context';
import { IamMaxBoundedContextService } from '@app/iam/bounded-context/application/max/iam-max-bounded-context.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamMaxBoundedContextQuery)
export class IamMaxBoundedContextQueryHandler implements IQueryHandler<IamMaxBoundedContextQuery>
{
    constructor(
        private readonly maxBoundedContextService: IamMaxBoundedContextService,
    ) {}

    async execute(query: IamMaxBoundedContextQuery): Promise<number>
    {
        return await this.maxBoundedContextService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
