import { QUEUE_REDIS } from '@app/queue-manager/queue-manager.types';
import { SharedModule } from '@aurora/shared.module';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { createClient } from 'redis';
import { QueueManagerHandlers, QueueManagerModels, QueueManagerRepositories, QueueManagerSagas, QueueManagerServices } from '../../@app/queue-manager';
import { QueueManagerQueueApiHandlers, QueueManagerQueueControllers, QueueManagerQueueResolvers, QueueManagerQueueServices } from './queue';
import { QueueManagerSeeder } from './queue-manager.seeder';
import { QueueRedisImplementationService } from './shared/services';
import { QueueManagerJobControllers, QueueManagerJobResolvers, QueueManagerJobApiHandlers, QueueManagerJobServices } from './job';
import { QueueManagerJobRegistryControllers, QueueManagerJobRegistryResolvers, QueueManagerJobRegistryApiHandlers, QueueManagerJobRegistryServices } from './job-registry';
import { appQueues } from 'src/app.queues';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
            ...QueueManagerModels,
        ]),
        ConfigModule,
        BullModule.forRootAsync({
            imports   : [ConfigModule],
            inject    : [ConfigService],
            useFactory: (configService: ConfigService) => ({
                redis: {
                    host    : configService.get('REDIS_HOST'),
                    port    : +configService.get('REDIS_PORT'),
                    password: configService.get('REDIS_PASSWORD'),
                },
                prefix           : configService.get('QUEUE_MANAGER_PREFIX'),
                defaultJobOptions: {
                    // removes the job when it successfully completes.
                    // A number specifies the amount of jobs to keep.
                    // Default behavior is to keep the job in the completed set.
                    removeOnComplete: +configService.get('QUEUE_MANAGER_REMOVE_ON_COMPLETE'),
                    removeOnFail    : +configService.get('QUEUE_MANAGER_REMOVE_ON_FAIL'),
                },
            }),
        }),
        BullModule.registerQueue(
            ...appQueues.common,
        ),
    ],
    controllers: [
        ...QueueManagerQueueControllers,
        ...QueueManagerJobControllers,
        ...QueueManagerJobRegistryControllers,
    ],
    providers: [
        {
            inject    : [ConfigService],
            provide   : QUEUE_REDIS,
            useFactory: async (configService: ConfigService) =>
            {
                const client = createClient({
                    url     : `redis://${configService.get('REDIS_HOST')}:${configService.get('REDIS_PORT')}`,
                    password: configService.get('REDIS_PASSWORD'),
                });
                await client.connect();
                return client;
            },
        },
        QueueRedisImplementationService,
        QueueManagerSeeder,
        ...QueueManagerHandlers,
        ...QueueManagerServices,
        ...QueueManagerRepositories,
        ...QueueManagerSagas,
        ...QueueManagerQueueResolvers,
        ...QueueManagerQueueApiHandlers,
        ...QueueManagerQueueServices,
        ...QueueManagerJobResolvers,
        ...QueueManagerJobApiHandlers,
        ...QueueManagerJobServices,
        ...QueueManagerJobRegistryResolvers,
        ...QueueManagerJobRegistryApiHandlers,
        ...QueueManagerJobRegistryServices,
    ],
})
export class QueueManagerModule {}
