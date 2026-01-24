// export DTOs
export { CommonCountryDto } from './dto/common-country.dto';
export { CommonCreateCountryDto } from './dto/common-create-country.dto';
export { CommonUpdateCountriesDto } from './dto/common-update-countries.dto';
export { CommonUpdateCountryByIdDto } from './dto/common-update-country-by-id.dto';

// export handlers
export { CommonCreateCountriesHandler } from './handlers/common-create-countries.handler';
export { CommonCreateCountryHandler } from './handlers/common-create-country.handler';
export { CommonDeleteCountriesHandler } from './handlers/common-delete-countries.handler';
export { CommonDeleteCountryByIdHandler } from './handlers/common-delete-country-by-id.handler';
export { CommonFindCountryByIdHandler } from './handlers/common-find-country-by-id.handler';
export { CommonFindCountryHandler } from './handlers/common-find-country.handler';
export { CommonGetCountriesHandler } from './handlers/common-get-countries.handler';
export { CommonPaginateCountriesHandler } from './handlers/common-paginate-countries.handler';
export { CommonUpdateCountriesHandler } from './handlers/common-update-countries.handler';
export { CommonUpdateCountryByIdHandler } from './handlers/common-update-country-by-id.handler';
export { CommonUpsertCountryHandler } from './handlers/common-upsert-country.handler';

// export controllers
export { CommonCreateCountriesController } from './controllers/common-create-countries.controller';
export { CommonCreateCountryController } from './controllers/common-create-country.controller';
export { CommonDeleteCountriesController } from './controllers/common-delete-countries.controller';
export { CommonDeleteCountryByIdController } from './controllers/common-delete-country-by-id.controller';
export { CommonFindCountryByIdController } from './controllers/common-find-country-by-id.controller';
export { CommonFindCountryController } from './controllers/common-find-country.controller';
export { CommonGetCountriesController } from './controllers/common-get-countries.controller';
export { CommonPaginateCountriesController } from './controllers/common-paginate-countries.controller';
export { CommonUpdateCountriesController } from './controllers/common-update-countries.controller';
export { CommonUpdateCountryByIdController } from './controllers/common-update-country-by-id.controller';
export { CommonUpsertCountryController } from './controllers/common-upsert-country.controller';

// export resolvers
export { CommonCreateCountriesResolver } from './resolvers/common-create-countries.resolver';
export { CommonCreateCountryResolver } from './resolvers/common-create-country.resolver';
export { CommonDeleteCountriesResolver } from './resolvers/common-delete-countries.resolver';
export { CommonDeleteCountryByIdResolver } from './resolvers/common-delete-country-by-id.resolver';
export { CommonFindCountryByIdResolver } from './resolvers/common-find-country-by-id.resolver';
export { CommonFindCountryResolver } from './resolvers/common-find-country.resolver';
export { CommonGetCountriesResolver } from './resolvers/common-get-countries.resolver';
export { CommonPaginateCountriesResolver } from './resolvers/common-paginate-countries.resolver';
export { CommonUpdateCountriesResolver } from './resolvers/common-update-countries.resolver';
export { CommonUpdateCountryByIdResolver } from './resolvers/common-update-country-by-id.resolver';
export { CommonUpsertCountryResolver } from './resolvers/common-upsert-country.resolver';

// export additionalApis
export { CommonAdministrativeAreasCountryController } from './controllers/common-administrative-areas-country.controller';
export { CommonAdministrativeAreasCountryHandler } from './handlers/common-administrative-areas-country.handler';
export { CommonAdministrativeAreasCountryResolver } from './resolvers/common-administrative-areas-country.resolver';

// import controllers
import { CommonCreateCountriesController } from './controllers/common-create-countries.controller';
import { CommonCreateCountryController } from './controllers/common-create-country.controller';
import { CommonDeleteCountriesController } from './controllers/common-delete-countries.controller';
import { CommonDeleteCountryByIdController } from './controllers/common-delete-country-by-id.controller';
import { CommonFindCountryByIdController } from './controllers/common-find-country-by-id.controller';
import { CommonFindCountryController } from './controllers/common-find-country.controller';
import { CommonGetCountriesController } from './controllers/common-get-countries.controller';
import { CommonPaginateCountriesController } from './controllers/common-paginate-countries.controller';
import { CommonUpdateCountriesController } from './controllers/common-update-countries.controller';
import { CommonUpdateCountryByIdController } from './controllers/common-update-country-by-id.controller';
import { CommonUpsertCountryController } from './controllers/common-upsert-country.controller';

// import resolvers
import { CommonCreateCountriesResolver } from './resolvers/common-create-countries.resolver';
import { CommonCreateCountryResolver } from './resolvers/common-create-country.resolver';
import { CommonDeleteCountriesResolver } from './resolvers/common-delete-countries.resolver';
import { CommonDeleteCountryByIdResolver } from './resolvers/common-delete-country-by-id.resolver';
import { CommonFindCountryByIdResolver } from './resolvers/common-find-country-by-id.resolver';
import { CommonFindCountryResolver } from './resolvers/common-find-country.resolver';
import { CommonGetCountriesResolver } from './resolvers/common-get-countries.resolver';
import { CommonPaginateCountriesResolver } from './resolvers/common-paginate-countries.resolver';
import { CommonUpdateCountriesResolver } from './resolvers/common-update-countries.resolver';
import { CommonUpdateCountryByIdResolver } from './resolvers/common-update-country-by-id.resolver';
import { CommonUpsertCountryResolver } from './resolvers/common-upsert-country.resolver';

// import handlers
import { CommonCreateCountriesHandler } from './handlers/common-create-countries.handler';
import { CommonCreateCountryHandler } from './handlers/common-create-country.handler';
import { CommonDeleteCountriesHandler } from './handlers/common-delete-countries.handler';
import { CommonDeleteCountryByIdHandler } from './handlers/common-delete-country-by-id.handler';
import { CommonFindCountryByIdHandler } from './handlers/common-find-country-by-id.handler';
import { CommonFindCountryHandler } from './handlers/common-find-country.handler';
import { CommonGetCountriesHandler } from './handlers/common-get-countries.handler';
import { CommonPaginateCountriesHandler } from './handlers/common-paginate-countries.handler';
import { CommonUpdateCountriesHandler } from './handlers/common-update-countries.handler';
import { CommonUpdateCountryByIdHandler } from './handlers/common-update-country-by-id.handler';
import { CommonUpsertCountryHandler } from './handlers/common-upsert-country.handler';

// import seeder
import { CommonCountrySeeder } from './seeder/common-country.seeder';

// import additionalApis
import { CommonAdministrativeAreasCountryController } from './controllers/common-administrative-areas-country.controller';
import { CommonAdministrativeAreasCountryHandler } from './handlers/common-administrative-areas-country.handler';
import { CommonAdministrativeAreasCountryResolver } from './resolvers/common-administrative-areas-country.resolver';

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

  // additionalApis
  CommonAdministrativeAreasCountryController,
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

  // additionalApis
  CommonAdministrativeAreasCountryResolver,
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

  // additionalApis
  CommonAdministrativeAreasCountryHandler,
];

export const CommonCountryApiServices = [CommonCountrySeeder];
