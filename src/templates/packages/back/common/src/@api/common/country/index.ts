// controllers
import { CommonCreateCountryController } from './controllers/common-create-country.controller';
import { CommonCreateCountriesController } from './controllers/common-create-countries.controller';
import { CommonPaginateCountriesController } from './controllers/common-paginate-countries.controller';
import { CommonGetCountriesController } from './controllers/common-get-countries.controller';
import { CommonFindCountryByIdController } from './controllers/common-find-country-by-id.controller';
import { CommonFindCountryController } from './controllers/common-find-country.controller';
import { CommonUpdateCountryController } from './controllers/common-update-country.controller';
import { CommonDeleteCountryByIdController } from './controllers/common-delete-country-by-id.controller';
import { CommonDeleteCountryByIdI18NController } from './controllers/common-delete-country-by-id-i18n.controller';
import { CommonDeleteCountriesController } from './controllers/common-delete-countries.controller';

// resolvers
import { CommonCreateCountryResolver } from './resolvers/common-create-country.resolver';
import { CommonCreateCountriesResolver } from './resolvers/common-create-countries.resolver';
import { CommonPaginateCountriesResolver } from './resolvers/common-paginate-countries.resolver';
import { CommonGetCountriesResolver } from './resolvers/common-get-countries.resolver';
import { CommonFindCountryByIdResolver } from './resolvers/common-find-country-by-id.resolver';
import { CommonFindCountryResolver } from './resolvers/common-find-country.resolver';
import { CommonUpdateCountryResolver } from './resolvers/common-update-country.resolver';
import { CommonDeleteCountryByIdResolver } from './resolvers/common-delete-country-by-id.resolver';
import { CommonDeleteCountryByIdI18NResolver } from './resolvers/common-delete-country-by-id-i18n.resolver';
import { CommonDeleteCountriesResolver } from './resolvers/common-delete-countries.resolver';

export const CommonCountryControllers = [
    CommonCreateCountryController,
    CommonCreateCountriesController,
    CommonPaginateCountriesController,
    CommonGetCountriesController,
    CommonFindCountryByIdController,
    CommonFindCountryController,
    CommonUpdateCountryController,
    CommonDeleteCountryByIdController,
    CommonDeleteCountryByIdI18NController,
    CommonDeleteCountriesController,
];

export const CommonCountryResolvers = [
    CommonCreateCountryResolver,
    CommonCreateCountriesResolver,
    CommonPaginateCountriesResolver,
    CommonGetCountriesResolver,
    CommonFindCountryByIdResolver,
    CommonFindCountryResolver,
    CommonUpdateCountryResolver,
    CommonDeleteCountryByIdResolver,
    CommonDeleteCountryByIdI18NResolver,
    CommonDeleteCountriesResolver,
];