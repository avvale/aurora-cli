import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonAdministrativeAreaLevel3Response } from '../../domain/common-administrative-area-level-3.response';
import { CommonAdministrativeAreaLevel3Mapper } from '../../domain/common-administrative-area-level-3.mapper';
import { CommonAdministrativeAreaLevel3Id } from '../../domain/value-objects';
import { CommonFindAdministrativeAreaLevel3ByIdQuery } from './common-find-administrative-area-level-3-by-id.query';
import { CommonFindAdministrativeAreaLevel3ByIdService } from './common-find-administrative-area-level-3-by-id.service';

@QueryHandler(CommonFindAdministrativeAreaLevel3ByIdQuery)
export class CommonFindAdministrativeAreaLevel3ByIdQueryHandler implements IQueryHandler<CommonFindAdministrativeAreaLevel3ByIdQuery>
{
    private readonly mapper: CommonAdministrativeAreaLevel3Mapper = new CommonAdministrativeAreaLevel3Mapper();

    constructor(
        private readonly findAdministrativeAreaLevel3ByIdService: CommonFindAdministrativeAreaLevel3ByIdService,
    ) {}

    async execute(query: CommonFindAdministrativeAreaLevel3ByIdQuery): Promise<CommonAdministrativeAreaLevel3Response>
    {
        const administrativeAreaLevel3 = await this.findAdministrativeAreaLevel3ByIdService.main(
            new CommonAdministrativeAreaLevel3Id(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(administrativeAreaLevel3);
    }
}