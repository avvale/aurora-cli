import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, AddI18NConstraintService, ContentLanguage, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { PaginateCountriesQuery } from '../../../../@apps/common/country/application/paginate/paginate-countries.query';
import { Pagination } from './../../../../graphql';

@Resolver()
export class CommonPaginateCountriesResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
        private readonly addI18NConstraintService: AddI18NConstraintService,
    ) {}

    @Query('commonPaginateCountries')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @ContentLanguage() contentLanguage?: string,
    ): Promise<Pagination>
    {
        constraint = await this.addI18NConstraintService.main(constraint, 'countryI18N', contentLanguage);
        return await this.queryBus.ask(new PaginateCountriesQuery(queryStatement, constraint, { timezone }));
    }
}