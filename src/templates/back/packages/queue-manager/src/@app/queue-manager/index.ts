import { QueueManagerQueueHandlers, QueueManagerQueueServices, QueueManagerQueueModel, IQueueRepository, SequelizeQueueRepository, QueueSagas } from './queue';
import { QueueManagerJobRegistryHandlers, QueueManagerJobRegistryServices, QueueManagerJobRegistryModel, IJobRegistryRepository, SequelizeJobRegistryRepository, JobRegistrySagas } from './job-registry';

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
        provide : IQueueRepository,
        useClass: SequelizeQueueRepository
    },
    {
        provide : IJobRegistryRepository,
        useClass: SequelizeJobRegistryRepository
    }
];
export const QueueManagerSagas = [
    QueueSagas,
    JobRegistrySagas
];
