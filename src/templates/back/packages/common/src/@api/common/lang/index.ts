// controllers
import { CommonCreateLangController } from './controllers/common-create-lang.controller';
import { CommonCreateLangsController } from './controllers/common-create-langs.controller';
import { CommonPaginateLangsController } from './controllers/common-paginate-langs.controller';
import { CommonGetLangsController } from './controllers/common-get-langs.controller';
import { CommonFindLangByIdController } from './controllers/common-find-lang-by-id.controller';
import { CommonFindLangController } from './controllers/common-find-lang.controller';
import { CommonUpdateLangByIdController } from './controllers/common-update-lang-by-id.controller';
import { CommonUpdateLangsController } from './controllers/common-update-langs.controller';
import { CommonDeleteLangByIdController } from './controllers/common-delete-lang-by-id.controller';
import { CommonDeleteLangsController } from './controllers/common-delete-langs.controller';

// resolvers
import { CommonCreateLangResolver } from './resolvers/common-create-lang.resolver';
import { CommonCreateLangsResolver } from './resolvers/common-create-langs.resolver';
import { CommonPaginateLangsResolver } from './resolvers/common-paginate-langs.resolver';
import { CommonGetLangsResolver } from './resolvers/common-get-langs.resolver';
import { CommonFindLangByIdResolver } from './resolvers/common-find-lang-by-id.resolver';
import { CommonFindLangResolver } from './resolvers/common-find-lang.resolver';
import { CommonUpdateLangByIdResolver } from './resolvers/common-update-lang-by-id.resolver';
import { CommonUpdateLangsResolver } from './resolvers/common-update-langs.resolver';
import { CommonDeleteLangByIdResolver } from './resolvers/common-delete-lang-by-id.resolver';
import { CommonDeleteLangsResolver } from './resolvers/common-delete-langs.resolver';

// handlers
import { CommonCreateLangHandler } from './handlers/common-create-lang.handler';
import { CommonCreateLangsHandler } from './handlers/common-create-langs.handler';
import { CommonPaginateLangsHandler } from './handlers/common-paginate-langs.handler';
import { CommonGetLangsHandler } from './handlers/common-get-langs.handler';
import { CommonFindLangByIdHandler } from './handlers/common-find-lang-by-id.handler';
import { CommonFindLangHandler } from './handlers/common-find-lang.handler';
import { CommonUpdateLangByIdHandler } from './handlers/common-update-lang-by-id.handler';
import { CommonUpdateLangsHandler } from './handlers/common-update-langs.handler';
import { CommonDeleteLangByIdHandler } from './handlers/common-delete-lang-by-id.handler';
import { CommonDeleteLangsHandler } from './handlers/common-delete-langs.handler';

export const CommonLangControllers = [
    CommonCreateLangController,
    CommonCreateLangsController,
    CommonPaginateLangsController,
    CommonGetLangsController,
    CommonFindLangByIdController,
    CommonFindLangController,
    CommonUpdateLangByIdController,
    CommonUpdateLangsController,
    CommonDeleteLangByIdController,
    CommonDeleteLangsController,
];

export const CommonLangResolvers = [
    CommonCreateLangResolver,
    CommonCreateLangsResolver,
    CommonPaginateLangsResolver,
    CommonGetLangsResolver,
    CommonFindLangByIdResolver,
    CommonFindLangResolver,
    CommonUpdateLangByIdResolver,
    CommonUpdateLangsResolver,
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
    CommonDeleteLangByIdHandler,
    CommonDeleteLangsHandler,
];