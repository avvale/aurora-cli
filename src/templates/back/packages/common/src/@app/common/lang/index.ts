// commands
import { CreateLangCommandHandler } from './application/create/create-lang.command-handler';
import { CreateLangsCommandHandler } from './application/create/create-langs.command-handler';
import { UpdateLangByIdCommandHandler } from './application/update/update-lang-by-id.command-handler';
import { UpdateLangsCommandHandler } from './application/update/update-langs.command-handler';
import { UpsertLangCommandHandler } from './application/upsert/upsert-lang.command-handler';
import { DeleteLangByIdCommandHandler } from './application/delete/delete-lang-by-id.command-handler';
import { DeleteLangsCommandHandler } from './application/delete/delete-langs.command-handler';

// queries
import { PaginateLangsQueryHandler } from './application/paginate/paginate-langs.query-handler';
import { GetLangsQueryHandler } from './application/get/get-langs.query-handler';
import { FindLangQueryHandler } from './application/find/find-lang.query-handler';
import { FindLangByIdQueryHandler } from './application/find/find-lang-by-id.query-handler';
import { RawSQLLangsQueryHandler } from './application/raw-sql/raw-sql-langs.query-handler';

// events
import { CreatedLangEventHandler } from './application/events/created-lang.event-handler';
import { CreatedLangsEventHandler } from './application/events/created-langs.event-handler';
import { UpdatedLangEventHandler } from './application/events/updated-lang.event-handler';
import { UpdatedLangsEventHandler } from './application/events/updated-langs.event-handler';
import { DeletedLangEventHandler } from './application/events/deleted-lang.event-handler';
import { DeletedLangsEventHandler } from './application/events/deleted-langs.event-handler';

// services
import { CreateLangService } from './application/create/create-lang.service';
import { CreateLangsService } from './application/create/create-langs.service';
import { PaginateLangsService } from './application/paginate/paginate-langs.service';
import { GetLangsService } from './application/get/get-langs.service';
import { FindLangService } from './application/find/find-lang.service';
import { FindLangByIdService } from './application/find/find-lang-by-id.service';
import { RawSQLLangsService } from './application/raw-sql/raw-sql-langs.service';
import { UpdateLangByIdService } from './application/update/update-lang-by-id.service';
import { UpdateLangsService } from './application/update/update-langs.service';
import { UpsertLangService } from './application/upsert/upsert-lang.service';
import { DeleteLangByIdService } from './application/delete/delete-lang-by-id.service';
import { DeleteLangsService } from './application/delete/delete-langs.service';

// models
export { CommonLangModel } from './infrastructure/sequelize/sequelize-lang.model';

// repository
export { ILangRepository } from './domain/lang.repository';
export { SequelizeLangRepository } from './infrastructure/sequelize/sequelize-lang.repository';

// sagas
export { LangSagas } from './application/sagas/lang.sagas';

export const CommonLangHandlers = [
    // commands
    CreateLangCommandHandler,
    CreateLangsCommandHandler,
    UpdateLangByIdCommandHandler,
    UpdateLangsCommandHandler,
    UpsertLangCommandHandler,
    DeleteLangByIdCommandHandler,
    DeleteLangsCommandHandler,

    // queries
    PaginateLangsQueryHandler,
    GetLangsQueryHandler,
    FindLangQueryHandler,
    FindLangByIdQueryHandler,
    RawSQLLangsQueryHandler,

    // events
    CreatedLangEventHandler,
    CreatedLangsEventHandler,
    UpdatedLangEventHandler,
    UpdatedLangsEventHandler,
    DeletedLangEventHandler,
    DeletedLangsEventHandler,
];

export const CommonLangServices = [
    CreateLangService,
    CreateLangsService,
    PaginateLangsService,
    GetLangsService,
    FindLangService,
    FindLangByIdService,
    RawSQLLangsService,
    UpdateLangByIdService,
    UpdateLangsService,
    UpsertLangService,
    DeleteLangByIdService,
    DeleteLangsService,
];