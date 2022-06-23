import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AdministrativeAreaLevel2Response } from '../../domain/administrative-area-level-2.response';
import { AdministrativeAreaLevel2Mapper } from '../../domain/administrative-area-level-2.mapper';
import { GetAdministrativeAreasLevel2Query } from './get-administrative-areas-level-2.query';
import { GetAdministrativeAreasLevel2Service } from './get-administrative-areas-level-2.service';

@QueryHandler(GetAdministrativeAreasLevel2Query)
export class GetAdministrativeAreasLevel2QueryHandler implements IQueryHandler<GetAdministrativeAreasLevel2Query>
{
    private readonly mapper: AdministrativeAreaLevel2Mapper = new AdministrativeAreaLevel2Mapper();

    constructor(
        private readonly getAdministrativeAreasLevel2Service: GetAdministrativeAreasLevel2Service,
    ) {}

    async execute(query: GetAdministrativeAreasLevel2Query): Promise<AdministrativeAreaLevel2Response[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getAdministrativeAreasLevel2Service.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}