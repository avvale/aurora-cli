// commands
import { CreateAdministrativeAreaLevel1CommandHandler } from './application/create/create-administrative-area-level-1.command-handler';
import { CreateAdministrativeAreasLevel1CommandHandler } from './application/create/create-administrative-areas-level-1.command-handler';
import { UpdateAdministrativeAreaLevel1ByIdCommandHandler } from './application/update/update-administrative-area-level-1-by-id.command-handler';
import { UpdateAdministrativeAreasLevel1CommandHandler } from './application/update/update-administrative-areas-level-1.command-handler';
import { DeleteAdministrativeAreaLevel1ByIdCommandHandler } from './application/delete/delete-administrative-area-level-1-by-id.command-handler';
import { DeleteAdministrativeAreasLevel1CommandHandler } from './application/delete/delete-administrative-areas-level-1.command-handler';

// queries
import { PaginateAdministrativeAreasLevel1QueryHandler } from './application/paginate/paginate-administrative-areas-level-1.query-handler';
import { GetAdministrativeAreasLevel1QueryHandler } from './application/get/get-administrative-areas-level-1.query-handler';
import { FindAdministrativeAreaLevel1QueryHandler } from './application/find/find-administrative-area-level-1.query-handler';
import { FindAdministrativeAreaLevel1ByIdQueryHandler } from './application/find/find-administrative-area-level-1-by-id.query-handler';

// events
import { CreatedAdministrativeAreaLevel1EventHandler } from './application/events/created-administrative-area-level-1.event-handler';
import { CreatedAdministrativeAreasLevel1EventHandler } from './application/events/created-administrative-areas-level-1.event-handler';
import { UpdatedAdministrativeAreaLevel1EventHandler } from './application/events/updated-administrative-area-level-1.event-handler';
import { UpdatedAdministrativeAreasLevel1EventHandler } from './application/events/updated-administrative-areas-level-1.event-handler';
import { DeletedAdministrativeAreaLevel1EventHandler } from './application/events/deleted-administrative-area-level-1.event-handler';
import { DeletedAdministrativeAreasLevel1EventHandler } from './application/events/deleted-administrative-areas-level-1.event-handler';

// services
import { CreateAdministrativeAreaLevel1Service } from './application/create/create-administrative-area-level-1.service';
import { CreateAdministrativeAreasLevel1Service } from './application/create/create-administrative-areas-level-1.service';
import { PaginateAdministrativeAreasLevel1Service } from './application/paginate/paginate-administrative-areas-level-1.service';
import { GetAdministrativeAreasLevel1Service } from './application/get/get-administrative-areas-level-1.service';
import { FindAdministrativeAreaLevel1Service } from './application/find/find-administrative-area-level-1.service';
import { FindAdministrativeAreaLevel1ByIdService } from './application/find/find-administrative-area-level-1-by-id.service';
import { UpdateAdministrativeAreaLevel1ByIdService } from './application/update/update-administrative-area-level-1-by-id.service';
import { UpdateAdministrativeAreasLevel1Service } from './application/update/update-administrative-areas-level-1.service';
import { DeleteAdministrativeAreaLevel1ByIdService } from './application/delete/delete-administrative-area-level-1-by-id.service';
import { DeleteAdministrativeAreasLevel1Service } from './application/delete/delete-administrative-areas-level-1.service';

// models
export { CommonAdministrativeAreaLevel1Model } from './infrastructure/sequelize/sequelize-administrative-area-level-1.model';

// repository
export { IAdministrativeAreaLevel1Repository } from './domain/administrative-area-level-1.repository';
export { SequelizeAdministrativeAreaLevel1Repository } from './infrastructure/sequelize/sequelize-administrative-area-level-1.repository';

// sagas
export { AdministrativeAreaLevel1Sagas } from './application/sagas/administrative-area-level-1.sagas';

export const CommonAdministrativeAreaLevel1Handlers = [
    // commands
    CreateAdministrativeAreaLevel1CommandHandler,
    CreateAdministrativeAreasLevel1CommandHandler,
    UpdateAdministrativeAreaLevel1ByIdCommandHandler,
    UpdateAdministrativeAreasLevel1CommandHandler,
    DeleteAdministrativeAreaLevel1ByIdCommandHandler,
    DeleteAdministrativeAreasLevel1CommandHandler,

    // queries
    PaginateAdministrativeAreasLevel1QueryHandler,
    GetAdministrativeAreasLevel1QueryHandler,
    FindAdministrativeAreaLevel1QueryHandler,
    FindAdministrativeAreaLevel1ByIdQueryHandler,

    // events
    CreatedAdministrativeAreaLevel1EventHandler,
    CreatedAdministrativeAreasLevel1EventHandler,
    UpdatedAdministrativeAreaLevel1EventHandler,
    UpdatedAdministrativeAreasLevel1EventHandler,
    DeletedAdministrativeAreaLevel1EventHandler,
    DeletedAdministrativeAreasLevel1EventHandler,
];

export const CommonAdministrativeAreaLevel1Services = [
    CreateAdministrativeAreaLevel1Service,
    CreateAdministrativeAreasLevel1Service,
    PaginateAdministrativeAreasLevel1Service,
    GetAdministrativeAreasLevel1Service,
    FindAdministrativeAreaLevel1Service,
    FindAdministrativeAreaLevel1ByIdService,
    UpdateAdministrativeAreaLevel1ByIdService,
    UpdateAdministrativeAreasLevel1Service,
    DeleteAdministrativeAreaLevel1ByIdService,
    DeleteAdministrativeAreasLevel1Service,
];