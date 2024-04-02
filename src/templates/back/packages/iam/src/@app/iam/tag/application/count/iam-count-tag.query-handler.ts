import { IamCountTagQuery } from '@app/iam/tag';
import { IamCountTagService } from '@app/iam/tag/application/count/iam-count-tag.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamCountTagQuery)
export class IamCountTagQueryHandler implements IQueryHandler<IamCountTagQuery>
{
    constructor(
        private readonly countTagService: IamCountTagService,
    ) {}

    async execute(query: IamCountTagQuery): Promise<number>
    {
        return await this.countTagService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
