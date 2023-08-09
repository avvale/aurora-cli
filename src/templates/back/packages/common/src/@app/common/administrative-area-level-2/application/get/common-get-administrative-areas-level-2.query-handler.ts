import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonAdministrativeAreaLevel2Response } from '../../domain/common-administrative-area-level-2.response';
import { CommonAdministrativeAreaLevel2Mapper } from '../../domain/common-administrative-area-level-2.mapper';
import { CommonGetAdministrativeAreasLevel2Query } from './common-get-administrative-areas-level-2.query';
import { CommonGetAdministrativeAreasLevel2Service } from './common-get-administrative-areas-level-2.service';

@QueryHandler(CommonGetAdministrativeAreasLevel2Query)
export class CommonGetAdministrativeAreasLevel2QueryHandler implements IQueryHandler<CommonGetAdministrativeAreasLevel2Query>
{
    private readonly mapper: CommonAdministrativeAreaLevel2Mapper = new CommonAdministrativeAreaLevel2Mapper();

    constructor(
        private readonly getAdministrativeAreasLevel2Service: CommonGetAdministrativeAreasLevel2Service,
    ) {}

    async execute(query: CommonGetAdministrativeAreasLevel2Query): Promise<CommonAdministrativeAreaLevel2Response[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getAdministrativeAreasLevel2Service.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
