import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonAdministrativeAreaLevel1Response } from '../../domain/common-administrative-area-level-1.response';
import { CommonAdministrativeAreaLevel1Mapper } from '../../domain/common-administrative-area-level-1.mapper';
import { CommonGetAdministrativeAreasLevel1Query } from './common-get-administrative-areas-level-1.query';
import { CommonGetAdministrativeAreasLevel1Service } from './common-get-administrative-areas-level-1.service';

@QueryHandler(CommonGetAdministrativeAreasLevel1Query)
export class CommonGetAdministrativeAreasLevel1QueryHandler implements IQueryHandler<CommonGetAdministrativeAreasLevel1Query>
{
    private readonly mapper: CommonAdministrativeAreaLevel1Mapper = new CommonAdministrativeAreaLevel1Mapper();

    constructor(
        private readonly getAdministrativeAreasLevel1Service: CommonGetAdministrativeAreasLevel1Service,
    ) {}

    async execute(query: CommonGetAdministrativeAreasLevel1Query): Promise<CommonAdministrativeAreaLevel1Response[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getAdministrativeAreasLevel1Service.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}