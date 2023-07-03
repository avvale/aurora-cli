// export commands
export { CommonCreateCountryCommand } from './application/create/common-create-country.command';
export { CommonCreateCountriesCommand } from './application/create/common-create-countries.command';
export { CommonUpdateCountryByIdCommand } from './application/update/common-update-country-by-id.command';
export { CommonUpdateCountriesCommand } from './application/update/common-update-countries.command';
export { CommonUpsertCountryCommand } from './application/upsert/common-upsert-country.command';
export { CommonDeleteCountryByIdCommand } from './application/delete/common-delete-country-by-id.command';
export { CommonDeleteCountryByIdI18nCommand } from './application/delete/common-delete-country-by-id-i18n.command';
export { CommonDeleteCountriesCommand } from './application/delete/common-delete-countries.command';

// export queries
export { CommonPaginateCountriesQuery } from './application/paginate/common-paginate-countries.query';
export { CommonGetCountriesQuery } from './application/get/common-get-countries.query';
export { CommonFindCountryQuery } from './application/find/common-find-country.query';
export { CommonFindCountryByIdQuery } from './application/find/common-find-country-by-id.query';
export { CommonRawSQLCountriesQuery } from './application/raw-sql/common-raw-sql-countries.query';

// export mocks
export { commonMockCountryData } from './infrastructure/mock/common-mock-country.data';
export { CommonMockCountrySeeder } from './infrastructure/mock/common-mock-country.seeder';
export { CommonMockCountryRepository } from './infrastructure/mock/common-mock-country.repository';

// export events
export { CommonAddCountriesContextEvent } from './application/events/common-add-countries-context.event';
export { CommonCreatedCountriesEvent } from './application/events/common-created-countries.event';
export { CommonCreatedCountryEvent } from './application/events/common-created-country.event';
export { CommonDeletedCountriesEvent } from './application/events/common-deleted-countries.event';
export { CommonDeletedCountryEvent } from './application/events/common-deleted-country.event';
export { CommonUpdatedCountriesEvent } from './application/events/common-updated-countries.event';
export { CommonUpdatedCountryEvent } from './application/events/common-updated-country.event';

// domain
export { CommonCountry } from './domain/common-country.aggregate';
export { CommonCountryMapper } from './domain/common-country.mapper';
export { CommonICountryRepository } from './domain/common-country.repository';
export { CommonCountryResponse } from './domain/common-country.response';
export { CommonICountryI18nRepository } from './domain/common-country-i18n.repository';

// infrastructure
export { CommonCountryModel } from './infrastructure/sequelize/common-sequelize-country.model';
export { CommonCountryI18nModel } from './infrastructure/sequelize/common-sequelize-country-i18n.model';
export { CommonSequelizeCountryRepository } from './infrastructure/sequelize/common-sequelize-country.repository';
export { CommonSequelizeCountryI18nRepository } from './infrastructure/sequelize/common-sequelize-country-i18n.repository';

// sagas
export { CommonCountrySagas } from './application/sagas/common-country.sagas';

// command handlers
import { CommonCreateCountryCommandHandler } from './application/create/common-create-country.command-handler';
import { CommonCreateCountriesCommandHandler } from './application/create/common-create-countries.command-handler';
import { CommonUpdateCountryByIdCommandHandler } from './application/update/common-update-country-by-id.command-handler';
import { CommonUpdateCountriesCommandHandler } from './application/update/common-update-countries.command-handler';
import { CommonUpsertCountryCommandHandler } from './application/upsert/common-upsert-country.command-handler';
import { CommonDeleteCountryByIdCommandHandler } from './application/delete/common-delete-country-by-id.command-handler';
import { CommonDeleteCountryByIdI18nCommandHandler } from './application/delete/common-delete-country-by-id-i18n.command-handler';
import { CommonDeleteCountriesCommandHandler } from './application/delete/common-delete-countries.command-handler';

// query handlers
import { CommonPaginateCountriesQueryHandler } from './application/paginate/common-paginate-countries.query-handler';
import { CommonGetCountriesQueryHandler } from './application/get/common-get-countries.query-handler';
import { CommonFindCountryQueryHandler } from './application/find/common-find-country.query-handler';
import { CommonFindCountryByIdQueryHandler } from './application/find/common-find-country-by-id.query-handler';
import { CommonRawSQLCountriesQueryHandler } from './application/raw-sql/common-raw-sql-countries.query-handler';

// event handlers
import { CommonCreatedCountryEventHandler } from './application/events/common-created-country.event-handler';
import { CommonCreatedCountriesEventHandler } from './application/events/common-created-countries.event-handler';
import { CommonUpdatedCountryEventHandler } from './application/events/common-updated-country.event-handler';
import { CommonUpdatedCountriesEventHandler } from './application/events/common-updated-countries.event-handler';
import { CommonDeletedCountryEventHandler } from './application/events/common-deleted-country.event-handler';
import { CommonDeletedCountriesEventHandler } from './application/events/common-deleted-countries.event-handler';

// services
import { CommonCreateCountryService } from './application/create/common-create-country.service';
import { CommonCreateCountriesService } from './application/create/common-create-countries.service';
import { CommonPaginateCountriesService } from './application/paginate/common-paginate-countries.service';
import { CommonGetCountriesService } from './application/get/common-get-countries.service';
import { CommonFindCountryService } from './application/find/common-find-country.service';
import { CommonFindCountryByIdService } from './application/find/common-find-country-by-id.service';
import { CommonRawSQLCountriesService } from './application/raw-sql/common-raw-sql-countries.service';
import { CommonUpdateCountryByIdService } from './application/update/common-update-country-by-id.service';
import { CommonUpdateCountriesService } from './application/update/common-update-countries.service';
import { CommonUpsertCountryService } from './application/upsert/common-upsert-country.service';
import { CommonDeleteCountryByIdService } from './application/delete/common-delete-country-by-id.service';
import { CommonDeleteCountryByIdI18nService } from './application/delete/common-delete-country-by-id-i18n.service';
import { CommonDeleteCountriesService } from './application/delete/common-delete-countries.service';

export const CommonCountryHandlers = [
    // commands
    CommonCreateCountryCommandHandler,
    CommonCreateCountriesCommandHandler,
    CommonUpdateCountryByIdCommandHandler,
    CommonUpdateCountriesCommandHandler,
    CommonUpsertCountryCommandHandler,
    CommonDeleteCountryByIdCommandHandler,
    CommonDeleteCountryByIdI18nCommandHandler,
    CommonDeleteCountriesCommandHandler,

    // queries
    CommonPaginateCountriesQueryHandler,
    CommonGetCountriesQueryHandler,
    CommonFindCountryQueryHandler,
    CommonFindCountryByIdQueryHandler,
    CommonRawSQLCountriesQueryHandler,

    // events
    CommonCreatedCountryEventHandler,
    CommonCreatedCountriesEventHandler,
    CommonUpdatedCountryEventHandler,
    CommonUpdatedCountriesEventHandler,
    CommonDeletedCountryEventHandler,
    CommonDeletedCountriesEventHandler,
];

export const CommonCountryServices = [
    CommonCreateCountryService,
    CommonCreateCountriesService,
    CommonPaginateCountriesService,
    CommonGetCountriesService,
    CommonFindCountryService,
    CommonFindCountryByIdService,
    CommonRawSQLCountriesService,
    CommonUpdateCountryByIdService,
    CommonUpdateCountriesService,
    CommonUpsertCountryService,
    CommonDeleteCountryByIdService,
    CommonDeleteCountryByIdI18nService,
    CommonDeleteCountriesService,
];