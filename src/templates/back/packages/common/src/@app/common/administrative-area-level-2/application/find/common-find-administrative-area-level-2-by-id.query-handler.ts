import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonAdministrativeAreaLevel2Response } from '../../domain/common-administrative-area-level-2.response';
import { CommonAdministrativeAreaLevel2Mapper } from '../../domain/common-administrative-area-level-2.mapper';
import { CommonAdministrativeAreaLevel2Id } from '../../domain/value-objects';
import { CommonFindAdministrativeAreaLevel2ByIdQuery } from './common-find-administrative-area-level-2-by-id.query';
import { CommonFindAdministrativeAreaLevel2ByIdService } from './common-find-administrative-area-level-2-by-id.service';

@QueryHandler(CommonFindAdministrativeAreaLevel2ByIdQuery)
export class CommonFindAdministrativeAreaLevel2ByIdQueryHandler implements IQueryHandler<CommonFindAdministrativeAreaLevel2ByIdQuery>
{
    private readonly mapper: CommonAdministrativeAreaLevel2Mapper = new CommonAdministrativeAreaLevel2Mapper();

    constructor(
        private readonly findAdministrativeAreaLevel2ByIdService: CommonFindAdministrativeAreaLevel2ByIdService,
    ) {}

    async execute(query: CommonFindAdministrativeAreaLevel2ByIdQuery): Promise<CommonAdministrativeAreaLevel2Response>
    {
        const administrativeAreaLevel2 = await this.findAdministrativeAreaLevel2ByIdService.main(
            new CommonAdministrativeAreaLevel2Id(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(administrativeAreaLevel2);
    }
}
