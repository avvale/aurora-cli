// controllers
import { CommonCreateCountryController } from './controllers/common-create-country.controller';
import { CommonCreateCountriesController } from './controllers/common-create-countries.controller';
import { CommonPaginateCountriesController } from './controllers/common-paginate-countries.controller';
import { CommonGetCountriesController } from './controllers/common-get-countries.controller';
import { CommonFindCountryByIdController } from './controllers/common-find-country-by-id.controller';
import { CommonFindCountryController } from './controllers/common-find-country.controller';
import { CommonUpdateCountryByIdController } from './controllers/common-update-country-by-id.controller';
import { CommonUpdateCountriesController } from './controllers/common-update-countries.controller';
import { CommonUpsertCountryController } from './controllers/common-upsert-country.controller';
import { CommonDeleteCountryByIdController } from './controllers/common-delete-country-by-id.controller';
import { CommonDeleteCountriesController } from './controllers/common-delete-countries.controller';

// resolvers
import { CommonCreateCountryResolver } from './resolvers/common-create-country.resolver';
import { CommonCreateCountriesResolver } from './resolvers/common-create-countries.resolver';
import { CommonPaginateCountriesResolver } from './resolvers/common-paginate-countries.resolver';
import { CommonGetCountriesResolver } from './resolvers/common-get-countries.resolver';
import { CommonFindCountryByIdResolver } from './resolvers/common-find-country-by-id.resolver';
import { CommonFindCountryResolver } from './resolvers/common-find-country.resolver';
import { CommonUpdateCountryByIdResolver } from './resolvers/common-update-country-by-id.resolver';
import { CommonUpdateCountriesResolver } from './resolvers/common-update-countries.resolver';
import { CommonUpsertCountryResolver } from './resolvers/common-upsert-country.resolver';
import { CommonDeleteCountryByIdResolver } from './resolvers/common-delete-country-by-id.resolver';
import { CommonDeleteCountriesResolver } from './resolvers/common-delete-countries.resolver';

// handlers
import { CommonCreateCountryHandler } from './handlers/common-create-country.handler';
import { CommonCreateCountriesHandler } from './handlers/common-create-countries.handler';
import { CommonPaginateCountriesHandler } from './handlers/common-paginate-countries.handler';
import { CommonGetCountriesHandler } from './handlers/common-get-countries.handler';
import { CommonFindCountryByIdHandler } from './handlers/common-find-country-by-id.handler';
import { CommonFindCountryHandler } from './handlers/common-find-country.handler';
import { CommonUpdateCountryByIdHandler } from './handlers/common-update-country-by-id.handler';
import { CommonUpdateCountriesHandler } from './handlers/common-update-countries.handler';
import { CommonUpsertCountryHandler } from './handlers/common-upsert-country.handler';
import { CommonDeleteCountryByIdHandler } from './handlers/common-delete-country-by-id.handler';
import { CommonDeleteCountriesHandler } from './handlers/common-delete-countries.handler';

// seeder
import { CommonCountrySeeder } from './seeder/common-country.seeder';

export const CommonCountryControllers = [
    CommonCreateCountryController,
    CommonCreateCountriesController,
    CommonPaginateCountriesController,
    CommonGetCountriesController,
    CommonFindCountryByIdController,
    CommonFindCountryController,
    CommonUpdateCountryByIdController,
    CommonUpdateCountriesController,
    CommonUpsertCountryController,
    CommonDeleteCountryByIdController,
    CommonDeleteCountriesController,
];

export const CommonCountryResolvers = [
    CommonCreateCountryResolver,
    CommonCreateCountriesResolver,
    CommonPaginateCountriesResolver,
    CommonGetCountriesResolver,
    CommonFindCountryByIdResolver,
    CommonFindCountryResolver,
    CommonUpdateCountryByIdResolver,
    CommonUpdateCountriesResolver,
    CommonUpsertCountryResolver,
    CommonDeleteCountryByIdResolver,
    CommonDeleteCountriesResolver,
];

export const CommonCountryApiHandlers = [
    CommonCreateCountryHandler,
    CommonCreateCountriesHandler,
    CommonPaginateCountriesHandler,
    CommonGetCountriesHandler,
    CommonFindCountryByIdHandler,
    CommonFindCountryHandler,
    CommonUpdateCountryByIdHandler,
    CommonUpdateCountriesHandler,
    CommonUpsertCountryHandler,
    CommonDeleteCountryByIdHandler,
    CommonDeleteCountriesHandler,
];

export const CommonCountryServices = [
    CommonCountrySeeder,
];