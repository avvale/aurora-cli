import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonResourceResponse } from '../../domain/common-resource.response';
import { CommonResourceMapper } from '../../domain/common-resource.mapper';
import { CommonResourceId } from '../../domain/value-objects';
import { CommonFindResourceByIdQuery } from './common-find-resource-by-id.query';
import { CommonFindResourceByIdService } from './common-find-resource-by-id.service';

@QueryHandler(CommonFindResourceByIdQuery)
export class CommonFindResourceByIdQueryHandler implements IQueryHandler<CommonFindResourceByIdQuery>
{
    private readonly mapper: CommonResourceMapper = new CommonResourceMapper();

    constructor(
        private readonly findResourceByIdService: CommonFindResourceByIdService,
    ) {}

    async execute(query: CommonFindResourceByIdQuery): Promise<CommonResourceResponse>
    {
        const resource = await this.findResourceByIdService.main(
            new CommonResourceId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(resource);
    }
}
