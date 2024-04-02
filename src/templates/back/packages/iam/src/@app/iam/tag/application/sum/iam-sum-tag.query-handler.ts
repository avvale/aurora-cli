import { IamSumTagQuery } from '@app/iam/tag';
import { IamSumTagService } from '@app/iam/tag/application/sum/iam-sum-tag.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamSumTagQuery)
export class IamSumTagQueryHandler implements IQueryHandler<IamSumTagQuery>
{
    constructor(
        private readonly sumTagService: IamSumTagService,
    ) {}

    async execute(query: IamSumTagQuery): Promise<number>
    {
        return await this.sumTagService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
