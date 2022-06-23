// commands
import { CreateAdministrativeAreaLevel3CommandHandler } from './application/create/create-administrative-area-level-3.command-handler';
import { CreateAdministrativeAreasLevel3CommandHandler } from './application/create/create-administrative-areas-level-3.command-handler';
import { UpdateAdministrativeAreaLevel3ByIdCommandHandler } from './application/update/update-administrative-area-level-3-by-id.command-handler';
import { UpdateAdministrativeAreasLevel3CommandHandler } from './application/update/update-administrative-areas-level-3.command-handler';
import { DeleteAdministrativeAreaLevel3ByIdCommandHandler } from './application/delete/delete-administrative-area-level-3-by-id.command-handler';
import { DeleteAdministrativeAreasLevel3CommandHandler } from './application/delete/delete-administrative-areas-level-3.command-handler';

// queries
import { PaginateAdministrativeAreasLevel3QueryHandler } from './application/paginate/paginate-administrative-areas-level-3.query-handler';
import { GetAdministrativeAreasLevel3QueryHandler } from './application/get/get-administrative-areas-level-3.query-handler';
import { FindAdministrativeAreaLevel3QueryHandler } from './application/find/find-administrative-area-level-3.query-handler';
import { FindAdministrativeAreaLevel3ByIdQueryHandler } from './application/find/find-administrative-area-level-3-by-id.query-handler';

// events
import { CreatedAdministrativeAreaLevel3EventHandler } from './application/events/created-administrative-area-level-3.event-handler';
import { CreatedAdministrativeAreasLevel3EventHandler } from './application/events/created-administrative-areas-level-3.event-handler';
import { UpdatedAdministrativeAreaLevel3EventHandler } from './application/events/updated-administrative-area-level-3.event-handler';
import { UpdatedAdministrativeAreasLevel3EventHandler } from './application/events/updated-administrative-areas-level-3.event-handler';
import { DeletedAdministrativeAreaLevel3EventHandler } from './application/events/deleted-administrative-area-level-3.event-handler';
import { DeletedAdministrativeAreasLevel3EventHandler } from './application/events/deleted-administrative-areas-level-3.event-handler';

// services
import { CreateAdministrativeAreaLevel3Service } from './application/create/create-administrative-area-level-3.service';
import { CreateAdministrativeAreasLevel3Service } from './application/create/create-administrative-areas-level-3.service';
import { PaginateAdministrativeAreasLevel3Service } from './application/paginate/paginate-administrative-areas-level-3.service';
import { GetAdministrativeAreasLevel3Service } from './application/get/get-administrative-areas-level-3.service';
import { FindAdministrativeAreaLevel3Service } from './application/find/find-administrative-area-level-3.service';
import { FindAdministrativeAreaLevel3ByIdService } from './application/find/find-administrative-area-level-3-by-id.service';
import { UpdateAdministrativeAreaLevel3ByIdService } from './application/update/update-administrative-area-level-3-by-id.service';
import { UpdateAdministrativeAreasLevel3Service } from './application/update/update-administrative-areas-level-3.service';
import { DeleteAdministrativeAreaLevel3ByIdService } from './application/delete/delete-administrative-area-level-3-by-id.service';
import { DeleteAdministrativeAreasLevel3Service } from './application/delete/delete-administrative-areas-level-3.service';

// models
export { CommonAdministrativeAreaLevel3Model } from './infrastructure/sequelize/sequelize-administrative-area-level-3.model';

// repository
export { IAdministrativeAreaLevel3Repository } from './domain/administrative-area-level-3.repository';
export { SequelizeAdministrativeAreaLevel3Repository } from './infrastructure/sequelize/sequelize-administrative-area-level-3.repository';

// sagas
export { AdministrativeAreaLevel3Sagas } from './application/sagas/administrative-area-level-3.sagas';

export const CommonAdministrativeAreaLevel3Handlers = [
    // commands
    CreateAdministrativeAreaLevel3CommandHandler,
    CreateAdministrativeAreasLevel3CommandHandler,
    UpdateAdministrativeAreaLevel3ByIdCommandHandler,
    UpdateAdministrativeAreasLevel3CommandHandler,
    DeleteAdministrativeAreaLevel3ByIdCommandHandler,
    DeleteAdministrativeAreasLevel3CommandHandler,

    // queries
    PaginateAdministrativeAreasLevel3QueryHandler,
    GetAdministrativeAreasLevel3QueryHandler,
    FindAdministrativeAreaLevel3QueryHandler,
    FindAdministrativeAreaLevel3ByIdQueryHandler,

    // events
    CreatedAdministrativeAreaLevel3EventHandler,
    CreatedAdministrativeAreasLevel3EventHandler,
    UpdatedAdministrativeAreaLevel3EventHandler,
    UpdatedAdministrativeAreasLevel3EventHandler,
    DeletedAdministrativeAreaLevel3EventHandler,
    DeletedAdministrativeAreasLevel3EventHandler,
];

export const CommonAdministrativeAreaLevel3Services = [
    CreateAdministrativeAreaLevel3Service,
    CreateAdministrativeAreasLevel3Service,
    PaginateAdministrativeAreasLevel3Service,
    GetAdministrativeAreasLevel3Service,
    FindAdministrativeAreaLevel3Service,
    FindAdministrativeAreaLevel3ByIdService,
    UpdateAdministrativeAreaLevel3ByIdService,
    UpdateAdministrativeAreasLevel3Service,
    DeleteAdministrativeAreaLevel3ByIdService,
    DeleteAdministrativeAreasLevel3Service,
];