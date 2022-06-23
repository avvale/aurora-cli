import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AdministrativeAreaLevel2Response } from '../../domain/administrative-area-level-2.response';
import { AdministrativeAreaLevel2Mapper } from '../../domain/administrative-area-level-2.mapper';
import { AdministrativeAreaLevel2Id } from '../../domain/value-objects';
import { FindAdministrativeAreaLevel2ByIdQuery } from './find-administrative-area-level-2-by-id.query';
import { FindAdministrativeAreaLevel2ByIdService } from './find-administrative-area-level-2-by-id.service';

@QueryHandler(FindAdministrativeAreaLevel2ByIdQuery)
export class FindAdministrativeAreaLevel2ByIdQueryHandler implements IQueryHandler<FindAdministrativeAreaLevel2ByIdQuery>
{
    private readonly mapper: AdministrativeAreaLevel2Mapper = new AdministrativeAreaLevel2Mapper();

    constructor(
        private readonly findAdministrativeAreaLevel2ByIdService: FindAdministrativeAreaLevel2ByIdService,
    ) {}

    async execute(query: FindAdministrativeAreaLevel2ByIdQuery): Promise<AdministrativeAreaLevel2Response>
    {
        const administrativeAreaLevel2 = await this.findAdministrativeAreaLevel2ByIdService.main(
            new AdministrativeAreaLevel2Id(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(administrativeAreaLevel2);
    }
}