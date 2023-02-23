import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AdministrativeAreaLevel3Response } from '../../domain/administrative-area-level-3.response';
import { AdministrativeAreaLevel3Mapper } from '../../domain/administrative-area-level-3.mapper';
import { GetAdministrativeAreasLevel3Query } from './get-administrative-areas-level-3.query';
import { GetAdministrativeAreasLevel3Service } from './get-administrative-areas-level-3.service';

@QueryHandler(GetAdministrativeAreasLevel3Query)
export class GetAdministrativeAreasLevel3QueryHandler implements IQueryHandler<GetAdministrativeAreasLevel3Query>
{
    private readonly mapper: AdministrativeAreaLevel3Mapper = new AdministrativeAreaLevel3Mapper();

    constructor(
        private readonly getAdministrativeAreasLevel3Service: GetAdministrativeAreasLevel3Service,
    ) {}

    async execute(query: GetAdministrativeAreasLevel3Query): Promise<AdministrativeAreaLevel3Response[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getAdministrativeAreasLevel3Service.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}