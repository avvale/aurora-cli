import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonAdministrativeAreaLevel3Response } from '../../domain/common-administrative-area-level-3.response';
import { CommonAdministrativeAreaLevel3Mapper } from '../../domain/common-administrative-area-level-3.mapper';
import { CommonGetAdministrativeAreasLevel3Query } from './common-get-administrative-areas-level-3.query';
import { CommonGetAdministrativeAreasLevel3Service } from './common-get-administrative-areas-level-3.service';

@QueryHandler(CommonGetAdministrativeAreasLevel3Query)
export class CommonGetAdministrativeAreasLevel3QueryHandler implements IQueryHandler<CommonGetAdministrativeAreasLevel3Query>
{
    private readonly mapper: CommonAdministrativeAreaLevel3Mapper = new CommonAdministrativeAreaLevel3Mapper();

    constructor(
        private readonly getAdministrativeAreasLevel3Service: CommonGetAdministrativeAreasLevel3Service,
    ) {}

    async execute(query: CommonGetAdministrativeAreasLevel3Query): Promise<CommonAdministrativeAreaLevel3Response[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getAdministrativeAreasLevel3Service.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
