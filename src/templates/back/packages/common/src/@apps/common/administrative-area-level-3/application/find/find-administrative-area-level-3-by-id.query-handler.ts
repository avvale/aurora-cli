import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AdministrativeAreaLevel3Response } from '../../domain/administrative-area-level-3.response';
import { AdministrativeAreaLevel3Mapper } from '../../domain/administrative-area-level-3.mapper';
import { AdministrativeAreaLevel3Id } from '../../domain/value-objects';
import { FindAdministrativeAreaLevel3ByIdQuery } from './find-administrative-area-level-3-by-id.query';
import { FindAdministrativeAreaLevel3ByIdService } from './find-administrative-area-level-3-by-id.service';

@QueryHandler(FindAdministrativeAreaLevel3ByIdQuery)
export class FindAdministrativeAreaLevel3ByIdQueryHandler implements IQueryHandler<FindAdministrativeAreaLevel3ByIdQuery>
{
    private readonly mapper: AdministrativeAreaLevel3Mapper = new AdministrativeAreaLevel3Mapper();

    constructor(
        private readonly findAdministrativeAreaLevel3ByIdService: FindAdministrativeAreaLevel3ByIdService,
    ) {}

    async execute(query: FindAdministrativeAreaLevel3ByIdQuery): Promise<AdministrativeAreaLevel3Response>
    {
        const administrativeAreaLevel3 = await this.findAdministrativeAreaLevel3ByIdService.main(
            new AdministrativeAreaLevel3Id(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(administrativeAreaLevel3);
    }
}