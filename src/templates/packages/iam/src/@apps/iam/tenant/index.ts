// commands
import { CreateTenantCommandHandler } from './application/create/create-tenant.command-handler';
import { CreateTenantsCommandHandler } from './application/create/create-tenants.command-handler';
import { UpdateTenantCommandHandler } from './application/update/update-tenant.command-handler';
import { DeleteTenantByIdCommandHandler } from './application/delete/delete-tenant-by-id.command-handler';
import { DeleteTenantsCommandHandler } from './application/delete/delete-tenants.command-handler';

// queries
import { PaginateTenantsQueryHandler } from './application/paginate/paginate-tenants.query-handler';
import { GetTenantsQueryHandler } from './application/get/get-tenants.query-handler';
import { FindTenantQueryHandler } from './application/find/find-tenant.query-handler';
import { FindTenantByIdQueryHandler } from './application/find/find-tenant-by-id.query-handler';

// events
import { CreatedTenantEventHandler } from './application/events/created-tenant.event-handler';
import { CreatedTenantsEventHandler } from './application/events/created-tenants.event-handler';
import { UpdatedTenantEventHandler } from './application/events/updated-tenant.event-handler';
import { DeletedTenantEventHandler } from './application/events/deleted-tenant.event-handler';
import { DeletedTenantsEventHandler } from './application/events/deleted-tenants.event-handler';

// services
import { CreateTenantService } from './application/create/create-tenant.service';
import { CreateTenantsService } from './application/create/create-tenants.service';
import { PaginateTenantsService } from './application/paginate/paginate-tenants.service';
import { GetTenantsService } from './application/get/get-tenants.service';
import { FindTenantService } from './application/find/find-tenant.service';
import { FindTenantByIdService } from './application/find/find-tenant-by-id.service';
import { UpdateTenantService } from './application/update/update-tenant.service';
import { DeleteTenantByIdService } from './application/delete/delete-tenant-by-id.service';
import { DeleteTenantsService } from './application/delete/delete-tenants.service';

// models
export { IamTenantModel } from './infrastructure/sequelize/sequelize-tenant.model';
export { IamTenantsAccountsModel } from './infrastructure/sequelize/sequelize-tenants-accounts.model';

// repository
export { ITenantRepository } from './domain/tenant.repository';
export { SequelizeTenantRepository } from './infrastructure/sequelize/sequelize-tenant.repository';

// sagas
export { TenantSagas } from './application/sagas/tenant.sagas';

export const IamTenantHandlers = [
    // commands
    CreateTenantCommandHandler,
    CreateTenantsCommandHandler,
    UpdateTenantCommandHandler,
    DeleteTenantByIdCommandHandler,
    DeleteTenantsCommandHandler,

    // queries
    PaginateTenantsQueryHandler,
    GetTenantsQueryHandler,
    FindTenantQueryHandler,
    FindTenantByIdQueryHandler,

    // events
    CreatedTenantEventHandler,
    CreatedTenantsEventHandler,
    UpdatedTenantEventHandler,
    DeletedTenantEventHandler,
    DeletedTenantsEventHandler,
];

export const IamTenantServices = [
    CreateTenantService,
    CreateTenantsService,
    PaginateTenantsService,
    GetTenantsService,
    FindTenantService,
    FindTenantByIdService,
    UpdateTenantService,
    DeleteTenantByIdService,
    DeleteTenantsService,
];