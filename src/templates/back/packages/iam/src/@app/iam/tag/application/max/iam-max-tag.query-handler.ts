import { IamMaxTagQuery } from '@app/iam/tag';
import { IamMaxTagService } from '@app/iam/tag/application/max/iam-max-tag.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamMaxTagQuery)
export class IamMaxTagQueryHandler implements IQueryHandler<IamMaxTagQuery>
{
    constructor(
        private readonly maxTagService: IamMaxTagService,
    ) {}

    async execute(query: IamMaxTagQuery): Promise<number>
    {
        return await this.maxTagService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
