/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
// export commands
export { CommonCreateCountriesCommand } from './application/create/common-create-countries.command';
export { CommonCreateCountryCommand } from './application/create/common-create-country.command';
export { CommonDeleteCountryByIdI18nCommand } from './application/delete/common-delete-country-by-id-i18n.command';
export { CommonDeleteCountryByIdCommand } from './application/delete/common-delete-country-by-id.command';
export { CommonUpdateCountryByIdCommand } from './application/update/common-update-country-by-id.command';

// export queries
export { CommonFindCountryByIdQuery } from './application/find/common-find-country-by-id.query';
export { CommonFindCountryQuery } from './application/find/common-find-country.query';
export { CommonGetCountriesQuery } from './application/get/common-get-countries.query';
export { CommonPaginateCountriesQuery } from './application/paginate/common-paginate-countries.query';

// export mocks
export { commonMockCountryData } from './infrastructure/mock/common-mock-country.data';
export { CommonMockCountryRepository } from './infrastructure/mock/common-mock-country.repository';
export { CommonMockCountrySeeder } from './infrastructure/mock/common-mock-country.seeder';

// export events
export { CommonAddCountriesContextEvent } from './application/events/common-add-countries-context.event';
export { CommonCreatedCountriesEvent } from './application/events/common-created-countries.event';
export { CommonCreatedCountryEvent } from './application/events/common-created-country.event';
export { CommonDeletedCountryEvent } from './application/events/common-deleted-country.event';
export { CommonUpdatedCountryEvent } from './application/events/common-updated-country.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { CommonICountryI18nRepository } from './domain/common-country-i18n.repository';
export { CommonCountry } from './domain/common-country.aggregate';
export { CommonCountryMapper } from './domain/common-country.mapper';
export { CommonICountryRepository } from './domain/common-country.repository';
export { CommonCountryResponse } from './domain/common-country.response';

// infrastructure
export { CommonCountryI18nModel } from './infrastructure/sequelize/common-sequelize-country-i18n.model';
export { CommonSequelizeCountryI18nRepository } from './infrastructure/sequelize/common-sequelize-country-i18n.repository';
export { CommonCountryModel } from './infrastructure/sequelize/common-sequelize-country.model';
export { CommonSequelizeCountryRepository } from './infrastructure/sequelize/common-sequelize-country.repository';

// sagas
export { CommonCountrySagas } from './application/sagas/common-country.sagas';

// command handlers
import { CommonCreateCountriesCommandHandler } from './application/create/common-create-countries.command-handler';
import { CommonCreateCountryCommandHandler } from './application/create/common-create-country.command-handler';
import { CommonDeleteCountryByIdI18nCommandHandler } from './application/delete/common-delete-country-by-id-i18n.command-handler';
import { CommonDeleteCountryByIdCommandHandler } from './application/delete/common-delete-country-by-id.command-handler';
import { CommonUpdateCountryByIdCommandHandler } from './application/update/common-update-country-by-id.command-handler';

// query handlers
import { CommonFindCountryByIdQueryHandler } from './application/find/common-find-country-by-id.query-handler';
import { CommonFindCountryQueryHandler } from './application/find/common-find-country.query-handler';
import { CommonGetCountriesQueryHandler } from './application/get/common-get-countries.query-handler';
import { CommonPaginateCountriesQueryHandler } from './application/paginate/common-paginate-countries.query-handler';

// event handlers
import { CommonCreatedCountriesEventHandler } from './application/events/common-created-countries.event-handler';
import { CommonCreatedCountryEventHandler } from './application/events/common-created-country.event-handler';
import { CommonDeletedCountryEventHandler } from './application/events/common-deleted-country.event-handler';
import { CommonUpdatedCountryEventHandler } from './application/events/common-updated-country.event-handler';

// services
import { CommonCreateCountriesService } from './application/create/common-create-countries.service';
import { CommonCreateCountryService } from './application/create/common-create-country.service';
import { CommonDeleteCountryByIdI18nService } from './application/delete/common-delete-country-by-id-i18n.service';
import { CommonDeleteCountryByIdService } from './application/delete/common-delete-country-by-id.service';
import { CommonFindCountryByIdService } from './application/find/common-find-country-by-id.service';
import { CommonFindCountryService } from './application/find/common-find-country.service';
import { CommonGetCountriesService } from './application/get/common-get-countries.service';
import { CommonPaginateCountriesService } from './application/paginate/common-paginate-countries.service';
import { CommonUpdateCountryByIdService } from './application/update/common-update-country-by-id.service';

export const CommonCountryHandlers = [
  // commands
  CommonCreateCountryCommandHandler,
  CommonCreateCountriesCommandHandler,
  CommonUpdateCountryByIdCommandHandler,
  CommonDeleteCountryByIdCommandHandler,
  CommonDeleteCountryByIdI18nCommandHandler,

  // queries
  CommonPaginateCountriesQueryHandler,
  CommonGetCountriesQueryHandler,
  CommonFindCountryQueryHandler,
  CommonFindCountryByIdQueryHandler,

  // events
  CommonCreatedCountryEventHandler,
  CommonCreatedCountriesEventHandler,
  CommonUpdatedCountryEventHandler,
  CommonDeletedCountryEventHandler,
];

export const CommonCountryServices = [
  CommonCreateCountryService,
  CommonCreateCountriesService,
  CommonPaginateCountriesService,
  CommonGetCountriesService,
  CommonFindCountryService,
  CommonFindCountryByIdService,
  CommonUpdateCountryByIdService,
  CommonDeleteCountryByIdService,
  CommonDeleteCountryByIdI18nService,
];
