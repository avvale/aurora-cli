// export commands
export { CommonCreateLangCommand } from './application/create/common-create-lang.command';
export { CommonCreateLangsCommand } from './application/create/common-create-langs.command';
export { CommonDeleteLangByIdCommand } from './application/delete/common-delete-lang-by-id.command';
export { CommonDeleteLangsCommand } from './application/delete/common-delete-langs.command';
export { CommonUpdateLangByIdCommand } from './application/update/common-update-lang-by-id.command';
export { CommonUpdateLangsCommand } from './application/update/common-update-langs.command';
export { CommonUpsertLangCommand } from './application/upsert/common-upsert-lang.command';

// export queries
export { CommonFindLangByIdQuery } from './application/find/common-find-lang-by-id.query';
export { CommonFindLangQuery } from './application/find/common-find-lang.query';
export { CommonGetLangsQuery } from './application/get/common-get-langs.query';
export { CommonPaginateLangsQuery } from './application/paginate/common-paginate-langs.query';
export { CommonRawSQLLangsQuery } from './application/raw-sql/common-raw-sql-langs.query';

// export mocks
export { commonMockLangData } from './infrastructure/mock/common-mock-lang.data';
export { CommonMockLangRepository } from './infrastructure/mock/common-mock-lang.repository';
export { CommonMockLangSeeder } from './infrastructure/mock/common-mock-lang.seeder';

// export events
export { CommonAddLangsContextEvent } from './application/events/common-add-langs-context.event';
export { CommonCreatedLangEvent } from './application/events/common-created-lang.event';
export { CommonCreatedLangsEvent } from './application/events/common-created-langs.event';
export { CommonDeletedLangEvent } from './application/events/common-deleted-lang.event';
export { CommonDeletedLangsEvent } from './application/events/common-deleted-langs.event';
export { CommonUpdatedLangEvent } from './application/events/common-updated-lang.event';
export { CommonUpdatedLangsEvent } from './application/events/common-updated-langs.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { CommonLang } from './domain/common-lang.aggregate';
export { CommonLangMapper } from './domain/common-lang.mapper';
export { CommonILangRepository } from './domain/common-lang.repository';
export { CommonLangResponse } from './domain/common-lang.response';

// infrastructure
export { CommonLangModel } from './infrastructure/sequelize/common-sequelize-lang.model';
export { CommonSequelizeLangRepository } from './infrastructure/sequelize/common-sequelize-lang.repository';

// sagas
export { CommonLangSagas } from './application/sagas/common-lang.sagas';

// command handlers
import { CommonCreateLangCommandHandler } from './application/create/common-create-lang.command-handler';
import { CommonCreateLangsCommandHandler } from './application/create/common-create-langs.command-handler';
import { CommonDeleteLangByIdCommandHandler } from './application/delete/common-delete-lang-by-id.command-handler';
import { CommonDeleteLangsCommandHandler } from './application/delete/common-delete-langs.command-handler';
import { CommonUpdateLangByIdCommandHandler } from './application/update/common-update-lang-by-id.command-handler';
import { CommonUpdateLangsCommandHandler } from './application/update/common-update-langs.command-handler';
import { CommonUpsertLangCommandHandler } from './application/upsert/common-upsert-lang.command-handler';

// query handlers
import { CommonFindLangByIdQueryHandler } from './application/find/common-find-lang-by-id.query-handler';
import { CommonFindLangQueryHandler } from './application/find/common-find-lang.query-handler';
import { CommonGetLangsQueryHandler } from './application/get/common-get-langs.query-handler';
import { CommonPaginateLangsQueryHandler } from './application/paginate/common-paginate-langs.query-handler';
import { CommonRawSQLLangsQueryHandler } from './application/raw-sql/common-raw-sql-langs.query-handler';

// event handlers
import { CommonCreatedLangEventHandler } from './application/events/common-created-lang.event-handler';
import { CommonCreatedLangsEventHandler } from './application/events/common-created-langs.event-handler';
import { CommonDeletedLangEventHandler } from './application/events/common-deleted-lang.event-handler';
import { CommonDeletedLangsEventHandler } from './application/events/common-deleted-langs.event-handler';
import { CommonUpdatedLangEventHandler } from './application/events/common-updated-lang.event-handler';
import { CommonUpdatedLangsEventHandler } from './application/events/common-updated-langs.event-handler';

// services
import { CommonCreateLangService } from './application/create/common-create-lang.service';
import { CommonCreateLangsService } from './application/create/common-create-langs.service';
import { CommonDeleteLangByIdService } from './application/delete/common-delete-lang-by-id.service';
import { CommonDeleteLangsService } from './application/delete/common-delete-langs.service';
import { CommonFindLangByIdService } from './application/find/common-find-lang-by-id.service';
import { CommonFindLangService } from './application/find/common-find-lang.service';
import { CommonGetLangsService } from './application/get/common-get-langs.service';
import { CommonPaginateLangsService } from './application/paginate/common-paginate-langs.service';
import { CommonRawSQLLangsService } from './application/raw-sql/common-raw-sql-langs.service';
import { CommonUpdateLangByIdService } from './application/update/common-update-lang-by-id.service';
import { CommonUpdateLangsService } from './application/update/common-update-langs.service';
import { CommonUpsertLangService } from './application/upsert/common-upsert-lang.service';

export const CommonLangHandlers = [
  // commands
  CommonCreateLangCommandHandler,
  CommonCreateLangsCommandHandler,
  CommonUpdateLangByIdCommandHandler,
  CommonUpdateLangsCommandHandler,
  CommonUpsertLangCommandHandler,
  CommonDeleteLangByIdCommandHandler,
  CommonDeleteLangsCommandHandler,

  // queries
  CommonPaginateLangsQueryHandler,
  CommonGetLangsQueryHandler,
  CommonFindLangQueryHandler,
  CommonFindLangByIdQueryHandler,
  CommonRawSQLLangsQueryHandler,

  // events
  CommonCreatedLangEventHandler,
  CommonCreatedLangsEventHandler,
  CommonUpdatedLangEventHandler,
  CommonUpdatedLangsEventHandler,
  CommonDeletedLangEventHandler,
  CommonDeletedLangsEventHandler,
];

export const CommonLangServices = [
  CommonCreateLangService,
  CommonCreateLangsService,
  CommonPaginateLangsService,
  CommonGetLangsService,
  CommonFindLangService,
  CommonFindLangByIdService,
  CommonRawSQLLangsService,
  CommonUpdateLangByIdService,
  CommonUpdateLangsService,
  CommonUpsertLangService,
  CommonDeleteLangByIdService,
  CommonDeleteLangsService,
];
