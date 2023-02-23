import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AdministrativeAreaLevel2Response } from '../../domain/administrative-area-level-2.response';
import { AdministrativeAreaLevel2Mapper } from '../../domain/administrative-area-level-2.mapper';
import { FindAdministrativeAreaLevel2Query } from './find-administrative-area-level-2.query';
import { FindAdministrativeAreaLevel2Service } from './find-administrative-area-level-2.service';

@QueryHandler(FindAdministrativeAreaLevel2Query)
export class FindAdministrativeAreaLevel2QueryHandler implements IQueryHandler<FindAdministrativeAreaLevel2Query>
{
    private readonly mapper: AdministrativeAreaLevel2Mapper = new AdministrativeAreaLevel2Mapper();

    constructor(
        private readonly findAdministrativeAreaLevel2Service: FindAdministrativeAreaLevel2Service,
    ) {}

    async execute(query: FindAdministrativeAreaLevel2Query): Promise<AdministrativeAreaLevel2Response>
    {
        const administrativeAreaLevel2 = await this.findAdministrativeAreaLevel2Service.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(administrativeAreaLevel2);
    }
}