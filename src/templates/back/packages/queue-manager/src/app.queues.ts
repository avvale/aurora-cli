import { QueueRegister } from '@app/queue-manager/queue-manager.types';

// storages where all jobs are stored
export enum QueueStorage {
    COMMON_MAIL = 'mail',
}

// relationship between storage and bounded context
export const appQueues: QueueRegister = {
    // common is for all bounded contexts
    // TODO, SE PUEDEN REPETIR NOMBRES?? HACER FUNCIÓN PARE EVITAR REPETICIONES
    common: [
        {
            name: QueueStorage.COMMON_MAIL,
        },
    ],
    iam: [
        {
            name: QueueStorage.COMMON_MAIL,
        },
    ],
    queueManager: [
        {
            name: QueueStorage.COMMON_MAIL,
        },
    ],
};