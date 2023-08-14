import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonAdministrativeAreaLevel2Response } from '../../domain/common-administrative-area-level-2.response';
import { CommonAdministrativeAreaLevel2Mapper } from '../../domain/common-administrative-area-level-2.mapper';
import { CommonRawSQLAdministrativeAreasLevel2Query } from './common-raw-sql-administrative-areas-level-2.query';
import { CommonRawSQLAdministrativeAreasLevel2Service } from './common-raw-sql-administrative-areas-level-2.service';

@QueryHandler(CommonRawSQLAdministrativeAreasLevel2Query)
export class CommonRawSQLAdministrativeAreasLevel2QueryHandler implements IQueryHandler<CommonRawSQLAdministrativeAreasLevel2Query>
{
    private readonly mapper: CommonAdministrativeAreaLevel2Mapper = new CommonAdministrativeAreaLevel2Mapper();

    constructor(
        private readonly rawSQLAdministrativeAreasLevel2Service: CommonRawSQLAdministrativeAreasLevel2Service,
    ) {}

    async execute(query: CommonRawSQLAdministrativeAreasLevel2Query): Promise<CommonAdministrativeAreaLevel2Response[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLAdministrativeAreasLevel2Service.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
