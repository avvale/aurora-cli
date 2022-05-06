// controllers
import { CommonCreateLangController } from './controllers/common-create-lang.controller';
import { CommonCreateLangsController } from './controllers/common-create-langs.controller';
import { CommonPaginateLangsController } from './controllers/common-paginate-langs.controller';
import { CommonGetLangsController } from './controllers/common-get-langs.controller';
import { CommonFindLangByIdController } from './controllers/common-find-lang-by-id.controller';
import { CommonFindLangController } from './controllers/common-find-lang.controller';
import { CommonUpdateLangController } from './controllers/common-update-lang.controller';
import { CommonDeleteLangByIdController } from './controllers/common-delete-lang-by-id.controller';
import { CommonDeleteLangsController } from './controllers/common-delete-langs.controller';

// resolvers
import { CommonCreateLangResolver } from './resolvers/common-create-lang.resolver';
import { CommonCreateLangsResolver } from './resolvers/common-create-langs.resolver';
import { CommonPaginateLangsResolver } from './resolvers/common-paginate-langs.resolver';
import { CommonGetLangsResolver } from './resolvers/common-get-langs.resolver';
import { CommonFindLangByIdResolver } from './resolvers/common-find-lang-by-id.resolver';
import { CommonFindLangResolver } from './resolvers/common-find-lang.resolver';
import { CommonUpdateLangResolver } from './resolvers/common-update-lang.resolver';
import { CommonDeleteLangByIdResolver } from './resolvers/common-delete-lang-by-id.resolver';
import { CommonDeleteLangsResolver } from './resolvers/common-delete-langs.resolver';

export const CommonLangControllers = [
    CommonCreateLangController,
    CommonCreateLangsController,
    CommonPaginateLangsController,
    CommonGetLangsController,
    CommonFindLangByIdController,
    CommonFindLangController,
    CommonUpdateLangController,
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
    CommonUpdateLangResolver,
    CommonDeleteLangByIdResolver,
    CommonDeleteLangsResolver,
];