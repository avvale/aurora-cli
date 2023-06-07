// commands
import { CreateCountryCommandHandler } from './application/create/create-country.command-handler';
import { CreateCountriesCommandHandler } from './application/create/create-countries.command-handler';
import { UpdateCountryByIdCommandHandler } from './application/update/update-country-by-id.command-handler';
import { UpdateCountriesCommandHandler } from './application/update/update-countries.command-handler';
import { UpsertCountryCommandHandler } from './application/upsert/upsert-country.command-handler';
import { DeleteCountryByIdCommandHandler } from './application/delete/delete-country-by-id.command-handler';
import { DeleteCountryByIdI18nCommandHandler } from './application/delete/delete-country-by-id-i18n.command-handler';
import { DeleteCountriesCommandHandler } from './application/delete/delete-countries.command-handler';

// queries
import { PaginateCountriesQueryHandler } from './application/paginate/paginate-countries.query-handler';
import { GetCountriesQueryHandler } from './application/get/get-countries.query-handler';
import { FindCountryQueryHandler } from './application/find/find-country.query-handler';
import { FindCountryByIdQueryHandler } from './application/find/find-country-by-id.query-handler';
import { RawSQLCountriesQueryHandler } from './application/raw-sql/raw-sql-countries.query-handler';

// events
import { CreatedCountryEventHandler } from './application/events/created-country.event-handler';
import { CreatedCountriesEventHandler } from './application/events/created-countries.event-handler';
import { UpdatedCountryEventHandler } from './application/events/updated-country.event-handler';
import { UpdatedCountriesEventHandler } from './application/events/updated-countries.event-handler';
import { DeletedCountryEventHandler } from './application/events/deleted-country.event-handler';
import { DeletedCountriesEventHandler } from './application/events/deleted-countries.event-handler';

// services
import { CreateCountryService } from './application/create/create-country.service';
import { CreateCountriesService } from './application/create/create-countries.service';
import { PaginateCountriesService } from './application/paginate/paginate-countries.service';
import { GetCountriesService } from './application/get/get-countries.service';
import { FindCountryService } from './application/find/find-country.service';
import { FindCountryByIdService } from './application/find/find-country-by-id.service';
import { RawSQLCountriesService } from './application/raw-sql/raw-sql-countries.service';
import { UpdateCountryByIdService } from './application/update/update-country-by-id.service';
import { UpdateCountriesService } from './application/update/update-countries.service';
import { UpsertCountryService } from './application/upsert/upsert-country.service';
import { DeleteCountryByIdService } from './application/delete/delete-country-by-id.service';
import { DeleteCountryByIdI18nService } from './application/delete/delete-country-by-id-i18n.service';
import { DeleteCountriesService } from './application/delete/delete-countries.service';

// models
export { CommonCountryModel } from './infrastructure/sequelize/sequelize-country.model';
export { CommonCountryI18nModel } from './infrastructure/sequelize/sequelize-country-i18n.model';

// repository
export { ICountryRepository } from './domain/country.repository';
export { SequelizeCountryRepository } from './infrastructure/sequelize/sequelize-country.repository';
export { ICountryI18nRepository } from './domain/country-i18n.repository';
export { SequelizeCountryI18nRepository } from './infrastructure/sequelize/sequelize-country-i18n.repository';

// sagas
export { CountrySagas } from './application/sagas/country.sagas';

export const CommonCountryHandlers = [
    // commands
    CreateCountryCommandHandler,
    CreateCountriesCommandHandler,
    UpdateCountryByIdCommandHandler,
    UpdateCountriesCommandHandler,
    UpsertCountryCommandHandler,
    DeleteCountryByIdCommandHandler,
    DeleteCountryByIdI18nCommandHandler,
    DeleteCountriesCommandHandler,

    // queries
    PaginateCountriesQueryHandler,
    GetCountriesQueryHandler,
    FindCountryQueryHandler,
    FindCountryByIdQueryHandler,
    RawSQLCountriesQueryHandler,

    // events
    CreatedCountryEventHandler,
    CreatedCountriesEventHandler,
    UpdatedCountryEventHandler,
    UpdatedCountriesEventHandler,
    DeletedCountryEventHandler,
    DeletedCountriesEventHandler,
];

export const CommonCountryServices = [
    CreateCountryService,
    CreateCountriesService,
    PaginateCountriesService,
    GetCountriesService,
    FindCountryService,
    FindCountryByIdService,
    RawSQLCountriesService,
    UpdateCountryByIdService,
    UpdateCountriesService,
    UpsertCountryService,
    DeleteCountryByIdService,
    DeleteCountryByIdI18nService,
    DeleteCountriesService,
];