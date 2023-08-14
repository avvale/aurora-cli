import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonAdministrativeAreaLevel3Response } from '../../domain/common-administrative-area-level-3.response';
import { CommonAdministrativeAreaLevel3Mapper } from '../../domain/common-administrative-area-level-3.mapper';
import { CommonRawSQLAdministrativeAreasLevel3Query } from './common-raw-sql-administrative-areas-level-3.query';
import { CommonRawSQLAdministrativeAreasLevel3Service } from './common-raw-sql-administrative-areas-level-3.service';

@QueryHandler(CommonRawSQLAdministrativeAreasLevel3Query)
export class CommonRawSQLAdministrativeAreasLevel3QueryHandler implements IQueryHandler<CommonRawSQLAdministrativeAreasLevel3Query>
{
    private readonly mapper: CommonAdministrativeAreaLevel3Mapper = new CommonAdministrativeAreaLevel3Mapper();

    constructor(
        private readonly rawSQLAdministrativeAreasLevel3Service: CommonRawSQLAdministrativeAreasLevel3Service,
    ) {}

    async execute(query: CommonRawSQLAdministrativeAreasLevel3Query): Promise<CommonAdministrativeAreaLevel3Response[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLAdministrativeAreasLevel3Service.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
