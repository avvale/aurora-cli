// export DTOs
export { CommonCountryDto } from './dto/common-country.dto';
export { CommonCreateCountryDto } from './dto/common-create-country.dto';
export { CommonUpdateCountryByIdDto } from './dto/common-update-country-by-id.dto';
export { CommonUpdateCountriesDto } from './dto/common-update-countries.dto';

// export handlers
export { CommonCreateCountryHandler } from './handlers/common-create-country.handler';
export { CommonCreateCountriesHandler } from './handlers/common-create-countries.handler';
export { CommonPaginateCountriesHandler } from './handlers/common-paginate-countries.handler';
export { CommonGetCountriesHandler } from './handlers/common-get-countries.handler';
export { CommonFindCountryByIdHandler } from './handlers/common-find-country-by-id.handler';
export { CommonFindCountryHandler } from './handlers/common-find-country.handler';
export { CommonUpdateCountryByIdHandler } from './handlers/common-update-country-by-id.handler';
export { CommonUpdateCountriesHandler } from './handlers/common-update-countries.handler';
export { CommonUpsertCountryHandler } from './handlers/common-upsert-country.handler';
export { CommonDeleteCountryByIdHandler } from './handlers/common-delete-country-by-id.handler';
export { CommonDeleteCountriesHandler } from './handlers/common-delete-countries.handler';

// export controllers
export { CommonCreateCountryController } from './controllers/common-create-country.controller';
export { CommonCreateCountriesController } from './controllers/common-create-countries.controller';
export { CommonPaginateCountriesController } from './controllers/common-paginate-countries.controller';
export { CommonGetCountriesController } from './controllers/common-get-countries.controller';
export { CommonFindCountryByIdController } from './controllers/common-find-country-by-id.controller';
export { CommonFindCountryController } from './controllers/common-find-country.controller';
export { CommonUpdateCountryByIdController } from './controllers/common-update-country-by-id.controller';
export { CommonUpdateCountriesController } from './controllers/common-update-countries.controller';
export { CommonUpsertCountryController } from './controllers/common-upsert-country.controller';
export { CommonDeleteCountryByIdController } from './controllers/common-delete-country-by-id.controller';
export { CommonDeleteCountriesController } from './controllers/common-delete-countries.controller';

// exports resolvers
export { CommonCreateCountryResolver } from './resolvers/common-create-country.resolver';
export { CommonCreateCountriesResolver } from './resolvers/common-create-countries.resolver';
export { CommonPaginateCountriesResolver } from './resolvers/common-paginate-countries.resolver';
export { CommonGetCountriesResolver } from './resolvers/common-get-countries.resolver';
export { CommonFindCountryByIdResolver } from './resolvers/common-find-country-by-id.resolver';
export { CommonFindCountryResolver } from './resolvers/common-find-country.resolver';
export { CommonUpdateCountryByIdResolver } from './resolvers/common-update-country-by-id.resolver';
export { CommonUpdateCountriesResolver } from './resolvers/common-update-countries.resolver';
export { CommonUpsertCountryResolver } from './resolvers/common-upsert-country.resolver';
export { CommonDeleteCountryByIdResolver } from './resolvers/common-delete-country-by-id.resolver';
export { CommonDeleteCountriesResolver } from './resolvers/common-delete-countries.resolver';

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

export const CommonCountryApiControllers = [
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

export const CommonCountryApiResolvers = [
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

export const CommonCountryApiServices = [
    CommonCountrySeeder,
];
