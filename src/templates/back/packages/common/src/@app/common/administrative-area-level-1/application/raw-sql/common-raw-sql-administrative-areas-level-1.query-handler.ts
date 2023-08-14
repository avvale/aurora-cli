import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonAdministrativeAreaLevel1Response } from '../../domain/common-administrative-area-level-1.response';
import { CommonAdministrativeAreaLevel1Mapper } from '../../domain/common-administrative-area-level-1.mapper';
import { CommonRawSQLAdministrativeAreasLevel1Query } from './common-raw-sql-administrative-areas-level-1.query';
import { CommonRawSQLAdministrativeAreasLevel1Service } from './common-raw-sql-administrative-areas-level-1.service';

@QueryHandler(CommonRawSQLAdministrativeAreasLevel1Query)
export class CommonRawSQLAdministrativeAreasLevel1QueryHandler implements IQueryHandler<CommonRawSQLAdministrativeAreasLevel1Query>
{
    private readonly mapper: CommonAdministrativeAreaLevel1Mapper = new CommonAdministrativeAreaLevel1Mapper();

    constructor(
        private readonly rawSQLAdministrativeAreasLevel1Service: CommonRawSQLAdministrativeAreasLevel1Service,
    ) {}

    async execute(query: CommonRawSQLAdministrativeAreasLevel1Query): Promise<CommonAdministrativeAreaLevel1Response[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLAdministrativeAreasLevel1Service.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
