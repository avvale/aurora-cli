import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonAdministrativeAreaLevel3Response } from '../../domain/common-administrative-area-level-3.response';
import { CommonAdministrativeAreaLevel3Mapper } from '../../domain/common-administrative-area-level-3.mapper';
import { CommonFindAdministrativeAreaLevel3Query } from './common-find-administrative-area-level-3.query';
import { CommonFindAdministrativeAreaLevel3Service } from './common-find-administrative-area-level-3.service';

@QueryHandler(CommonFindAdministrativeAreaLevel3Query)
export class CommonFindAdministrativeAreaLevel3QueryHandler implements IQueryHandler<CommonFindAdministrativeAreaLevel3Query>
{
    private readonly mapper: CommonAdministrativeAreaLevel3Mapper = new CommonAdministrativeAreaLevel3Mapper();

    constructor(
        private readonly findAdministrativeAreaLevel3Service: CommonFindAdministrativeAreaLevel3Service,
    ) {}

    async execute(query: CommonFindAdministrativeAreaLevel3Query): Promise<CommonAdministrativeAreaLevel3Response>
    {
        const administrativeAreaLevel3 = await this.findAdministrativeAreaLevel3Service.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(administrativeAreaLevel3);
    }
}
