// commands
import { CreateAdministrativeAreaLevel2CommandHandler } from './application/create/create-administrative-area-level-2.command-handler';
import { CreateAdministrativeAreasLevel2CommandHandler } from './application/create/create-administrative-areas-level-2.command-handler';
import { UpdateAdministrativeAreaLevel2ByIdCommandHandler } from './application/update/update-administrative-area-level-2-by-id.command-handler';
import { UpdateAdministrativeAreasLevel2CommandHandler } from './application/update/update-administrative-areas-level-2.command-handler';
import { DeleteAdministrativeAreaLevel2ByIdCommandHandler } from './application/delete/delete-administrative-area-level-2-by-id.command-handler';
import { DeleteAdministrativeAreasLevel2CommandHandler } from './application/delete/delete-administrative-areas-level-2.command-handler';

// queries
import { PaginateAdministrativeAreasLevel2QueryHandler } from './application/paginate/paginate-administrative-areas-level-2.query-handler';
import { GetAdministrativeAreasLevel2QueryHandler } from './application/get/get-administrative-areas-level-2.query-handler';
import { FindAdministrativeAreaLevel2QueryHandler } from './application/find/find-administrative-area-level-2.query-handler';
import { FindAdministrativeAreaLevel2ByIdQueryHandler } from './application/find/find-administrative-area-level-2-by-id.query-handler';

// events
import { CreatedAdministrativeAreaLevel2EventHandler } from './application/events/created-administrative-area-level-2.event-handler';
import { CreatedAdministrativeAreasLevel2EventHandler } from './application/events/created-administrative-areas-level-2.event-handler';
import { UpdatedAdministrativeAreaLevel2EventHandler } from './application/events/updated-administrative-area-level-2.event-handler';
import { UpdatedAdministrativeAreasLevel2EventHandler } from './application/events/updated-administrative-areas-level-2.event-handler';
import { DeletedAdministrativeAreaLevel2EventHandler } from './application/events/deleted-administrative-area-level-2.event-handler';
import { DeletedAdministrativeAreasLevel2EventHandler } from './application/events/deleted-administrative-areas-level-2.event-handler';

// services
import { CreateAdministrativeAreaLevel2Service } from './application/create/create-administrative-area-level-2.service';
import { CreateAdministrativeAreasLevel2Service } from './application/create/create-administrative-areas-level-2.service';
import { PaginateAdministrativeAreasLevel2Service } from './application/paginate/paginate-administrative-areas-level-2.service';
import { GetAdministrativeAreasLevel2Service } from './application/get/get-administrative-areas-level-2.service';
import { FindAdministrativeAreaLevel2Service } from './application/find/find-administrative-area-level-2.service';
import { FindAdministrativeAreaLevel2ByIdService } from './application/find/find-administrative-area-level-2-by-id.service';
import { UpdateAdministrativeAreaLevel2ByIdService } from './application/update/update-administrative-area-level-2-by-id.service';
import { UpdateAdministrativeAreasLevel2Service } from './application/update/update-administrative-areas-level-2.service';
import { DeleteAdministrativeAreaLevel2ByIdService } from './application/delete/delete-administrative-area-level-2-by-id.service';
import { DeleteAdministrativeAreasLevel2Service } from './application/delete/delete-administrative-areas-level-2.service';

// models
export { CommonAdministrativeAreaLevel2Model } from './infrastructure/sequelize/sequelize-administrative-area-level-2.model';

// repository
export { IAdministrativeAreaLevel2Repository } from './domain/administrative-area-level-2.repository';
export { SequelizeAdministrativeAreaLevel2Repository } from './infrastructure/sequelize/sequelize-administrative-area-level-2.repository';

// sagas
export { AdministrativeAreaLevel2Sagas } from './application/sagas/administrative-area-level-2.sagas';

export const CommonAdministrativeAreaLevel2Handlers = [
    // commands
    CreateAdministrativeAreaLevel2CommandHandler,
    CreateAdministrativeAreasLevel2CommandHandler,
    UpdateAdministrativeAreaLevel2ByIdCommandHandler,
    UpdateAdministrativeAreasLevel2CommandHandler,
    DeleteAdministrativeAreaLevel2ByIdCommandHandler,
    DeleteAdministrativeAreasLevel2CommandHandler,

    // queries
    PaginateAdministrativeAreasLevel2QueryHandler,
    GetAdministrativeAreasLevel2QueryHandler,
    FindAdministrativeAreaLevel2QueryHandler,
    FindAdministrativeAreaLevel2ByIdQueryHandler,

    // events
    CreatedAdministrativeAreaLevel2EventHandler,
    CreatedAdministrativeAreasLevel2EventHandler,
    UpdatedAdministrativeAreaLevel2EventHandler,
    UpdatedAdministrativeAreasLevel2EventHandler,
    DeletedAdministrativeAreaLevel2EventHandler,
    DeletedAdministrativeAreasLevel2EventHandler,
];

export const CommonAdministrativeAreaLevel2Services = [
    CreateAdministrativeAreaLevel2Service,
    CreateAdministrativeAreasLevel2Service,
    PaginateAdministrativeAreasLevel2Service,
    GetAdministrativeAreasLevel2Service,
    FindAdministrativeAreaLevel2Service,
    FindAdministrativeAreaLevel2ByIdService,
    UpdateAdministrativeAreaLevel2ByIdService,
    UpdateAdministrativeAreasLevel2Service,
    DeleteAdministrativeAreaLevel2ByIdService,
    DeleteAdministrativeAreasLevel2Service,
];