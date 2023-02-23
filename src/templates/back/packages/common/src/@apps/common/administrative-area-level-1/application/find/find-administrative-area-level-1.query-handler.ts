import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AdministrativeAreaLevel1Response } from '../../domain/administrative-area-level-1.response';
import { AdministrativeAreaLevel1Mapper } from '../../domain/administrative-area-level-1.mapper';
import { FindAdministrativeAreaLevel1Query } from './find-administrative-area-level-1.query';
import { FindAdministrativeAreaLevel1Service } from './find-administrative-area-level-1.service';

@QueryHandler(FindAdministrativeAreaLevel1Query)
export class FindAdministrativeAreaLevel1QueryHandler implements IQueryHandler<FindAdministrativeAreaLevel1Query>
{
    private readonly mapper: AdministrativeAreaLevel1Mapper = new AdministrativeAreaLevel1Mapper();

    constructor(
        private readonly findAdministrativeAreaLevel1Service: FindAdministrativeAreaLevel1Service,
    ) {}

    async execute(query: FindAdministrativeAreaLevel1Query): Promise<AdministrativeAreaLevel1Response>
    {
        const administrativeAreaLevel1 = await this.findAdministrativeAreaLevel1Service.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(administrativeAreaLevel1);
    }
}