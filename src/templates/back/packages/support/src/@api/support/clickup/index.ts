// export DTOs
export { ClickupFolderDto } from './dto/clickup-folder.dto';
export { ClickupListDto } from './dto/clickup-list.dto';
export { ClickupSpaceDto } from './dto/clickup-space.dto';

// export handlers
export { ClickupFolderHandler } from './handlers/clickup-folder.handler';
export { ClickupListHandler } from './handlers/clickup-list.handler';
export { ClickupSpaceHandler } from './handlers/clickup-space.handler';

// export controllers
export { ClickupFolderController } from './controllers/clickup-folder.controller';
export { ClickupListController } from './controllers/clickup-list.controller';
export { ClickupSpaceController } from './controllers/clickup-space.controller';

// export resolvers
export { ClickupFolderResolver } from './resolvers/clickup-folder.resolver';
export { ClickupListResolver } from './resolvers/clickup-list.resolver';
export { ClickupSpaceResolver } from './resolvers/clickup-space.resolver';

// import controllers
import { ClickupFolderController } from './controllers/clickup-folder.controller';
import { ClickupListController } from './controllers/clickup-list.controller';
import { ClickupSpaceController } from './controllers/clickup-space.controller';

// import resolvers
import { ClickupFolderResolver } from './resolvers/clickup-folder.resolver';
import { ClickupListResolver } from './resolvers/clickup-list.resolver';
import { ClickupSpaceResolver } from './resolvers/clickup-space.resolver';

// import handlers
import { ClickupFolderHandler } from './handlers/clickup-folder.handler';
import { ClickupListHandler } from './handlers/clickup-list.handler';
import { ClickupSpaceHandler } from './handlers/clickup-space.handler';

// import services
import { SupportConfigService } from './shared/clickup-key-value.service';
import { ClickupService } from './shared/clickup.service';

export const SupportClickupApiControllers = [
  ClickupSpaceController,
  ClickupFolderController,
  ClickupListController,
];

export const SupportClickupApiResolvers = [
  ClickupSpaceResolver,
  ClickupFolderResolver,
  ClickupListResolver,
];

export const SupportClickupApiHandlers = [
  ClickupSpaceHandler,
  ClickupFolderHandler,
  ClickupListHandler,
];

export const SupportClickupApiServices = [SupportConfigService, ClickupService];
