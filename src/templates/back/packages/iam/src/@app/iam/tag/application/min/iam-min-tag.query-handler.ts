import { IamMinTagQuery } from '@app/iam/tag';
import { IamMinTagService } from '@app/iam/tag/application/min/iam-min-tag.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamMinTagQuery)
export class IamMinTagQueryHandler implements IQueryHandler<IamMinTagQuery>
{
    constructor(
        private readonly minTagService: IamMinTagService,
    ) {}

    async execute(query: IamMinTagQuery): Promise<number>
    {
        return await this.minTagService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
