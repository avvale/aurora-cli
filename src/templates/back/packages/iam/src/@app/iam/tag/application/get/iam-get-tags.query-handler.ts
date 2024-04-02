import { IamGetTagsQuery, IamTagMapper, IamTagResponse } from '@app/iam/tag';
import { IamGetTagsService } from '@app/iam/tag/application/get/iam-get-tags.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamGetTagsQuery)
export class IamGetTagsQueryHandler implements IQueryHandler<IamGetTagsQuery>
{
    private readonly mapper: IamTagMapper = new IamTagMapper();

    constructor(
        private readonly getTagsService: IamGetTagsService,
    ) {}

    async execute(query: IamGetTagsQuery): Promise<IamTagResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getTagsService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}
