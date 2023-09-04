import { CommonAdministrativeAreaLevel3Mapper, CommonAdministrativeAreaLevel3Response, CommonRawSQLAdministrativeAreasLevel3Query } from '@app/common/administrative-area-level-3';
import { CommonRawSQLAdministrativeAreasLevel3Service } from '@app/common/administrative-area-level-3/application/raw-sql/common-raw-sql-administrative-areas-level-3.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

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
