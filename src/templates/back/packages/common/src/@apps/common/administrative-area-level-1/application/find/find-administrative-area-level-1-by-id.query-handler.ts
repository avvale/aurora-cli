import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AdministrativeAreaLevel1Response } from '../../domain/administrative-area-level-1.response';
import { AdministrativeAreaLevel1Mapper } from '../../domain/administrative-area-level-1.mapper';
import { AdministrativeAreaLevel1Id } from '../../domain/value-objects';
import { FindAdministrativeAreaLevel1ByIdQuery } from './find-administrative-area-level-1-by-id.query';
import { FindAdministrativeAreaLevel1ByIdService } from './find-administrative-area-level-1-by-id.service';

@QueryHandler(FindAdministrativeAreaLevel1ByIdQuery)
export class FindAdministrativeAreaLevel1ByIdQueryHandler implements IQueryHandler<FindAdministrativeAreaLevel1ByIdQuery>
{
    private readonly mapper: AdministrativeAreaLevel1Mapper = new AdministrativeAreaLevel1Mapper();

    constructor(
        private readonly findAdministrativeAreaLevel1ByIdService: FindAdministrativeAreaLevel1ByIdService,
    ) {}

    async execute(query: FindAdministrativeAreaLevel1ByIdQuery): Promise<AdministrativeAreaLevel1Response>
    {
        const administrativeAreaLevel1 = await this.findAdministrativeAreaLevel1ByIdService.main(
            new AdministrativeAreaLevel1Id(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(administrativeAreaLevel1);
    }
}