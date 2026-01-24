import { QUEUE_REDIS } from '@app/queue-manager/queue-manager.types';
import { SharedModule } from '@aurora/shared.module';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { createClient } from 'redis';
import { appQueues } from 'src/app.queues';
import {
  QueueManagerHandlers,
  QueueManagerModels,
  QueueManagerRepositories,
  QueueManagerSagas,
  QueueManagerServices,
} from '../../@app/queue-manager';
import {
  QueueManagerJobApiHandlers,
  QueueManagerJobControllers,
  QueueManagerJobResolvers,
  QueueManagerJobServices,
} from './job';
import {
  QueueManagerJobRegistryApiControllers,
  QueueManagerJobRegistryApiHandlers,
  QueueManagerJobRegistryApiResolvers,
  QueueManagerJobRegistryApiServices,
} from './job-registry';
import {
  QueueManagerQueueApiControllers,
  QueueManagerQueueApiHandlers,
  QueueManagerQueueApiResolvers,
  QueueManagerQueueApiServices,
} from './queue';
import { QueueManagerSeeder } from './queue-manager.seeder';
import { QueueRedisImplementationService } from './shared/services';

@Module({
  imports: [
    SharedModule,
    SequelizeModule.forFeature([...QueueManagerModels]),
    ConfigModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get('REDIS_HOST'),
          port: +configService.get('REDIS_PORT'),
          password: configService.get('REDIS_PASSWORD'),
        },
        prefix: configService.get('QUEUE_MANAGER_PREFIX'),
        defaultJobOptions: {
          // removes the job when it successfully completes.
          // A number specifies the amount of jobs to keep.
          // Default behavior is to keep the job in the completed set.
          removeOnComplete: +configService.get(
            'QUEUE_MANAGER_REMOVE_ON_COMPLETE',
          ),
          removeOnFail: +configService.get('QUEUE_MANAGER_REMOVE_ON_FAIL'),
        },
      }),
    }),
    BullModule.registerQueue(...appQueues.common),
  ],
  controllers: [
    ...QueueManagerJobControllers,
    ...QueueManagerQueueApiControllers,
    ...QueueManagerJobRegistryApiControllers,
  ],
  providers: [
    {
      inject: [ConfigService],
      provide: QUEUE_REDIS,
      useFactory: async (configService: ConfigService) => {
        try {
          const client = createClient({
            url: `redis://${configService.get('REDIS_HOST')}:${configService.get('REDIS_PORT')}`,
            password: configService.get('REDIS_PASSWORD'),
          });

          await client.connect();
          return client;
        } catch (e) {
          console.log(e);
        }
      },
    },
    QueueRedisImplementationService,
    QueueManagerSeeder,
    ...QueueManagerHandlers,
    ...QueueManagerServices,
    ...QueueManagerRepositories,
    ...QueueManagerSagas,
    ...QueueManagerQueueApiHandlers,
    ...QueueManagerJobResolvers,
    ...QueueManagerJobApiHandlers,
    ...QueueManagerJobServices,
    ...QueueManagerJobRegistryApiHandlers,
    ...QueueManagerQueueApiResolvers,
    ...QueueManagerQueueApiServices,
    ...QueueManagerJobRegistryApiResolvers,
    ...QueueManagerJobRegistryApiServices,
  ],
})
export class QueueManagerModule {}
