import {
  AuditingISideEffectRepository,
  AuditingMockSideEffectRepository,
} from '@app/auditing/side-effect';
import { AuditingFindSideEffectService } from '@app/auditing/side-effect/application/find/auditing-find-side-effect.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingFindSideEffectService', () => {
  let service: AuditingFindSideEffectService;
  let repository: AuditingISideEffectRepository;
  let mockRepository: AuditingMockSideEffectRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        AuditingFindSideEffectService,
        AuditingMockSideEffectRepository,
        {
          provide: AuditingISideEffectRepository,
          useValue: {
            find: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(AuditingFindSideEffectService);
    repository = module.get(AuditingISideEffectRepository);
    mockRepository = module.get(AuditingMockSideEffectRepository);
  });

  describe('main', () => {
    test('AuditingFindSideEffectService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find sideEffect', async () => {
      jest
        .spyOn(repository, 'find')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(await service.main()).toBe(mockRepository.collectionSource[0]);
    });
  });
});
