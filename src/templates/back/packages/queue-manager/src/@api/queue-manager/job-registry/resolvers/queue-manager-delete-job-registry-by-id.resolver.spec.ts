/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  QueueManagerDeleteJobRegistryByIdHandler,
  QueueManagerDeleteJobRegistryByIdResolver,
} from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerDeleteJobRegistryByIdResolver', () => {
  let resolver: QueueManagerDeleteJobRegistryByIdResolver;
  let handler: QueueManagerDeleteJobRegistryByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        QueueManagerDeleteJobRegistryByIdResolver,
        {
          provide: QueueManagerDeleteJobRegistryByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<QueueManagerDeleteJobRegistryByIdResolver>(
      QueueManagerDeleteJobRegistryByIdResolver,
    );
    handler = module.get<QueueManagerDeleteJobRegistryByIdHandler>(
      QueueManagerDeleteJobRegistryByIdHandler,
    );
  });

  test('QueueManagerDeleteJobRegistryByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('QueueManagerDeleteJobRegistryByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an jobRegistry deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(queueManagerMockJobRegistryData[0]),
            ),
        );
      expect(await resolver.main(queueManagerMockJobRegistryData[0].id)).toBe(
        queueManagerMockJobRegistryData[0],
      );
    });
  });
});
