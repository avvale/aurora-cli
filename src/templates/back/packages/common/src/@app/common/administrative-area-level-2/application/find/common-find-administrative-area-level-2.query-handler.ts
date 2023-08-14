import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonAdministrativeAreaLevel2Response } from '../../domain/common-administrative-area-level-2.response';
import { CommonAdministrativeAreaLevel2Mapper } from '../../domain/common-administrative-area-level-2.mapper';
import { CommonFindAdministrativeAreaLevel2Query } from './common-find-administrative-area-level-2.query';
import { CommonFindAdministrativeAreaLevel2Service } from './common-find-administrative-area-level-2.service';

@QueryHandler(CommonFindAdministrativeAreaLevel2Query)
export class CommonFindAdministrativeAreaLevel2QueryHandler implements IQueryHandler<CommonFindAdministrativeAreaLevel2Query>
{
    private readonly mapper: CommonAdministrativeAreaLevel2Mapper = new CommonAdministrativeAreaLevel2Mapper();

    constructor(
        private readonly findAdministrativeAreaLevel2Service: CommonFindAdministrativeAreaLevel2Service,
    ) {}

    async execute(query: CommonFindAdministrativeAreaLevel2Query): Promise<CommonAdministrativeAreaLevel2Response>
    {
        const administrativeAreaLevel2 = await this.findAdministrativeAreaLevel2Service.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(administrativeAreaLevel2);
    }
}
