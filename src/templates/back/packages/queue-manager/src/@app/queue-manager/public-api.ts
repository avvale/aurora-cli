import { QueueManagerQueueHandlers, QueueManagerQueueServices, QueueManagerQueueModel, QueueManagerIQueueRepository, QueueManagerSequelizeQueueRepository, QueueManagerQueueSagas } from './queue';
import { QueueManagerJobRegistryHandlers, QueueManagerJobRegistryServices, QueueManagerJobRegistryModel, QueueManagerIJobRegistryRepository, QueueManagerSequelizeJobRegistryRepository, QueueManagerJobRegistrySagas } from './job-registry';

export * from './queue';
export * from './job-registry';
export * from './queue-manager.types';
export { QueueDefinition, QUEUE_REDIS } from './queue-manager.types';

export const QueueManagerHandlers = [
    ...QueueManagerQueueHandlers,
    ...QueueManagerJobRegistryHandlers,
];
export const QueueManagerServices = [
    ...QueueManagerQueueServices,
    ...QueueManagerJobRegistryServices
];
export const QueueManagerModels = [
    QueueManagerQueueModel,
    QueueManagerJobRegistryModel
];
export const QueueManagerRepositories = [
    {
        provide : QueueManagerIQueueRepository,
        useClass: QueueManagerSequelizeQueueRepository
    },
    {
        provide : QueueManagerIJobRegistryRepository,
        useClass: QueueManagerSequelizeJobRegistryRepository
    }
];
export const QueueManagerSagas = [
    QueueManagerQueueSagas,
    QueueManagerJobRegistrySagas
];
