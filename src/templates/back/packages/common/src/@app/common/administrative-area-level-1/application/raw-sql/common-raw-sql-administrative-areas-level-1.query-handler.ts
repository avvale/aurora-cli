import { CommonAdministrativeAreaLevel1Mapper, CommonAdministrativeAreaLevel1Response, CommonRawSQLAdministrativeAreasLevel1Query } from '@app/common/administrative-area-level-1';
import { CommonRawSQLAdministrativeAreasLevel1Service } from '@app/common/administrative-area-level-1/application/raw-sql/common-raw-sql-administrative-areas-level-1.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

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
