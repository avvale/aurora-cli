import {
  QueueManagerIJobRegistryRepository,
  QueueManagerJobRegistryHandlers,
  QueueManagerJobRegistryModel,
  QueueManagerJobRegistrySagas,
  QueueManagerJobRegistryServices,
  QueueManagerSequelizeJobRegistryRepository,
} from './job-registry';
import {
  QueueManagerIQueueRepository,
  QueueManagerQueueHandlers,
  QueueManagerQueueModel,
  QueueManagerQueueSagas,
  QueueManagerQueueServices,
  QueueManagerSequelizeQueueRepository,
} from './queue';

export * from './job-registry';
export * from './queue';
export * from './queue-manager.types';
export { QUEUE_REDIS, QueueDefinition } from './queue-manager.types';

export const QueueManagerHandlers = [
  ...QueueManagerQueueHandlers,
  ...QueueManagerJobRegistryHandlers,
];
export const QueueManagerServices = [
  ...QueueManagerQueueServices,
  ...QueueManagerJobRegistryServices,
];
export const QueueManagerModels = [
  QueueManagerQueueModel,
  QueueManagerJobRegistryModel,
];
export const QueueManagerRepositories = [
  {
    provide: QueueManagerIQueueRepository,
    useClass: QueueManagerSequelizeQueueRepository,
  },
  {
    provide: QueueManagerIJobRegistryRepository,
    useClass: QueueManagerSequelizeJobRegistryRepository,
  },
  {
    provide: QueueManagerIQueueRepository,
    useClass: QueueManagerSequelizeQueueRepository,
  },
  {
    provide: QueueManagerIJobRegistryRepository,
    useClass: QueueManagerSequelizeJobRegistryRepository,
  },
];
export const QueueManagerSagas = [
  QueueManagerQueueSagas,
  QueueManagerJobRegistrySagas,
];
