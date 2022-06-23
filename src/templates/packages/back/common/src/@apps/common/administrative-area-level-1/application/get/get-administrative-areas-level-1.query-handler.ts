import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AdministrativeAreaLevel1Response } from '../../domain/administrative-area-level-1.response';
import { AdministrativeAreaLevel1Mapper } from '../../domain/administrative-area-level-1.mapper';
import { GetAdministrativeAreasLevel1Query } from './get-administrative-areas-level-1.query';
import { GetAdministrativeAreasLevel1Service } from './get-administrative-areas-level-1.service';

@QueryHandler(GetAdministrativeAreasLevel1Query)
export class GetAdministrativeAreasLevel1QueryHandler implements IQueryHandler<GetAdministrativeAreasLevel1Query>
{
    private readonly mapper: AdministrativeAreaLevel1Mapper = new AdministrativeAreaLevel1Mapper();

    constructor(
        private readonly getAdministrativeAreasLevel1Service: GetAdministrativeAreasLevel1Service,
    ) {}

    async execute(query: GetAdministrativeAreasLevel1Query): Promise<AdministrativeAreaLevel1Response[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getAdministrativeAreasLevel1Service.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}