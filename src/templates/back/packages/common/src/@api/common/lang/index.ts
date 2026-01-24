// export DTOs
export { CommonCreateLangDto } from './dto/common-create-lang.dto';
export { CommonLangDto } from './dto/common-lang.dto';
export { CommonUpdateLangByIdDto } from './dto/common-update-lang-by-id.dto';
export { CommonUpdateLangsDto } from './dto/common-update-langs.dto';

// export handlers
export { CommonCreateLangHandler } from './handlers/common-create-lang.handler';
export { CommonCreateLangsHandler } from './handlers/common-create-langs.handler';
export { CommonDeleteLangByIdHandler } from './handlers/common-delete-lang-by-id.handler';
export { CommonDeleteLangsHandler } from './handlers/common-delete-langs.handler';
export { CommonFindLangByIdHandler } from './handlers/common-find-lang-by-id.handler';
export { CommonFindLangHandler } from './handlers/common-find-lang.handler';
export { CommonGetLangsHandler } from './handlers/common-get-langs.handler';
export { CommonPaginateLangsHandler } from './handlers/common-paginate-langs.handler';
export { CommonUpdateLangByIdHandler } from './handlers/common-update-lang-by-id.handler';
export { CommonUpdateLangsHandler } from './handlers/common-update-langs.handler';
export { CommonUpsertLangHandler } from './handlers/common-upsert-lang.handler';

// export controllers
export { CommonCreateLangController } from './controllers/common-create-lang.controller';
export { CommonCreateLangsController } from './controllers/common-create-langs.controller';
export { CommonDeleteLangByIdController } from './controllers/common-delete-lang-by-id.controller';
export { CommonDeleteLangsController } from './controllers/common-delete-langs.controller';
export { CommonFindLangByIdController } from './controllers/common-find-lang-by-id.controller';
export { CommonFindLangController } from './controllers/common-find-lang.controller';
export { CommonGetLangsController } from './controllers/common-get-langs.controller';
export { CommonPaginateLangsController } from './controllers/common-paginate-langs.controller';
export { CommonUpdateLangByIdController } from './controllers/common-update-lang-by-id.controller';
export { CommonUpdateLangsController } from './controllers/common-update-langs.controller';
export { CommonUpsertLangController } from './controllers/common-upsert-lang.controller';

// export resolvers
export { CommonCreateLangResolver } from './resolvers/common-create-lang.resolver';
export { CommonCreateLangsResolver } from './resolvers/common-create-langs.resolver';
export { CommonDeleteLangByIdResolver } from './resolvers/common-delete-lang-by-id.resolver';
export { CommonDeleteLangsResolver } from './resolvers/common-delete-langs.resolver';
export { CommonFindLangByIdResolver } from './resolvers/common-find-lang-by-id.resolver';
export { CommonFindLangResolver } from './resolvers/common-find-lang.resolver';
export { CommonGetLangsResolver } from './resolvers/common-get-langs.resolver';
export { CommonPaginateLangsResolver } from './resolvers/common-paginate-langs.resolver';
export { CommonUpdateLangByIdResolver } from './resolvers/common-update-lang-by-id.resolver';
export { CommonUpdateLangsResolver } from './resolvers/common-update-langs.resolver';
export { CommonUpsertLangResolver } from './resolvers/common-upsert-lang.resolver';

// import controllers
import { CommonCreateLangController } from './controllers/common-create-lang.controller';
import { CommonCreateLangsController } from './controllers/common-create-langs.controller';
import { CommonDeleteLangByIdController } from './controllers/common-delete-lang-by-id.controller';
import { CommonDeleteLangsController } from './controllers/common-delete-langs.controller';
import { CommonFindLangByIdController } from './controllers/common-find-lang-by-id.controller';
import { CommonFindLangController } from './controllers/common-find-lang.controller';
import { CommonGetLangsController } from './controllers/common-get-langs.controller';
import { CommonPaginateLangsController } from './controllers/common-paginate-langs.controller';
import { CommonUpdateLangByIdController } from './controllers/common-update-lang-by-id.controller';
import { CommonUpdateLangsController } from './controllers/common-update-langs.controller';
import { CommonUpsertLangController } from './controllers/common-upsert-lang.controller';

// import resolvers
import { CommonCreateLangResolver } from './resolvers/common-create-lang.resolver';
import { CommonCreateLangsResolver } from './resolvers/common-create-langs.resolver';
import { CommonDeleteLangByIdResolver } from './resolvers/common-delete-lang-by-id.resolver';
import { CommonDeleteLangsResolver } from './resolvers/common-delete-langs.resolver';
import { CommonFindLangByIdResolver } from './resolvers/common-find-lang-by-id.resolver';
import { CommonFindLangResolver } from './resolvers/common-find-lang.resolver';
import { CommonGetLangsResolver } from './resolvers/common-get-langs.resolver';
import { CommonPaginateLangsResolver } from './resolvers/common-paginate-langs.resolver';
import { CommonUpdateLangByIdResolver } from './resolvers/common-update-lang-by-id.resolver';
import { CommonUpdateLangsResolver } from './resolvers/common-update-langs.resolver';
import { CommonUpsertLangResolver } from './resolvers/common-upsert-lang.resolver';

// import handlers
import { CommonCreateLangHandler } from './handlers/common-create-lang.handler';
import { CommonCreateLangsHandler } from './handlers/common-create-langs.handler';
import { CommonDeleteLangByIdHandler } from './handlers/common-delete-lang-by-id.handler';
import { CommonDeleteLangsHandler } from './handlers/common-delete-langs.handler';
import { CommonFindLangByIdHandler } from './handlers/common-find-lang-by-id.handler';
import { CommonFindLangHandler } from './handlers/common-find-lang.handler';
import { CommonGetLangsHandler } from './handlers/common-get-langs.handler';
import { CommonPaginateLangsHandler } from './handlers/common-paginate-langs.handler';
import { CommonUpdateLangByIdHandler } from './handlers/common-update-lang-by-id.handler';
import { CommonUpdateLangsHandler } from './handlers/common-update-langs.handler';
import { CommonUpsertLangHandler } from './handlers/common-upsert-lang.handler';

// import seeder
import { CommonLangSeeder } from './seeder/common-lang.seeder';

export const CommonLangApiControllers = [
  CommonCreateLangController,
  CommonCreateLangsController,
  CommonPaginateLangsController,
  CommonGetLangsController,
  CommonFindLangByIdController,
  CommonFindLangController,
  CommonUpdateLangByIdController,
  CommonUpdateLangsController,
  CommonUpsertLangController,
  CommonDeleteLangByIdController,
  CommonDeleteLangsController,
];

export const CommonLangApiResolvers = [
  CommonCreateLangResolver,
  CommonCreateLangsResolver,
  CommonPaginateLangsResolver,
  CommonGetLangsResolver,
  CommonFindLangByIdResolver,
  CommonFindLangResolver,
  CommonUpdateLangByIdResolver,
  CommonUpdateLangsResolver,
  CommonUpsertLangResolver,
  CommonDeleteLangByIdResolver,
  CommonDeleteLangsResolver,
];

export const CommonLangApiHandlers = [
  CommonCreateLangHandler,
  CommonCreateLangsHandler,
  CommonPaginateLangsHandler,
  CommonGetLangsHandler,
  CommonFindLangByIdHandler,
  CommonFindLangHandler,
  CommonUpdateLangByIdHandler,
  CommonUpdateLangsHandler,
  CommonUpsertLangHandler,
  CommonDeleteLangByIdHandler,
  CommonDeleteLangsHandler,
];

export const CommonLangApiServices = [CommonLangSeeder];
