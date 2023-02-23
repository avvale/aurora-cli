import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AdministrativeAreaLevel3Response } from '../../domain/administrative-area-level-3.response';
import { AdministrativeAreaLevel3Mapper } from '../../domain/administrative-area-level-3.mapper';
import { FindAdministrativeAreaLevel3Query } from './find-administrative-area-level-3.query';
import { FindAdministrativeAreaLevel3Service } from './find-administrative-area-level-3.service';

@QueryHandler(FindAdministrativeAreaLevel3Query)
export class FindAdministrativeAreaLevel3QueryHandler implements IQueryHandler<FindAdministrativeAreaLevel3Query>
{
    private readonly mapper: AdministrativeAreaLevel3Mapper = new AdministrativeAreaLevel3Mapper();

    constructor(
        private readonly findAdministrativeAreaLevel3Service: FindAdministrativeAreaLevel3Service,
    ) {}

    async execute(query: FindAdministrativeAreaLevel3Query): Promise<AdministrativeAreaLevel3Response>
    {
        const administrativeAreaLevel3 = await this.findAdministrativeAreaLevel3Service.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(administrativeAreaLevel3);
    }
}