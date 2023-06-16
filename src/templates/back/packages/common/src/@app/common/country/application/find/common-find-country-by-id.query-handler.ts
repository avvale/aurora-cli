import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonCountryResponse } from '../../domain/common-country.response';
import { CommonCountryMapper } from '../../domain/common-country.mapper';
import { CommonCountryId } from '../../domain/value-objects';
import { CommonFindCountryByIdQuery } from './common-find-country-by-id.query';
import { CommonFindCountryByIdService } from './common-find-country-by-id.service';

@QueryHandler(CommonFindCountryByIdQuery)
export class CommonFindCountryByIdQueryHandler implements IQueryHandler<CommonFindCountryByIdQuery>
{
    private readonly mapper: CommonCountryMapper = new CommonCountryMapper();

    constructor(
        private readonly findCountryByIdService: CommonFindCountryByIdService,
    ) {}

    async execute(query: CommonFindCountryByIdQuery): Promise<CommonCountryResponse>
    {
        const country = await this.findCountryByIdService.main(
            new CommonCountryId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(country);
    }
}