/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AuditingISideEffectRepository,
  auditingMockSideEffectData,
  AuditingMockSideEffectRepository,
} from '@app/auditing/side-effect';
import { AuditingDeleteSideEffectByIdService } from '@app/auditing/side-effect/application/delete/auditing-delete-side-effect-by-id.service';
import { AuditingSideEffectId } from '@app/auditing/side-effect/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingDeleteSideEffectByIdService', () => {
  let service: AuditingDeleteSideEffectByIdService;
  let repository: AuditingISideEffectRepository;
  let mockRepository: AuditingMockSideEffectRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        AuditingDeleteSideEffectByIdService,
        AuditingMockSideEffectRepository,
        {
          provide: AuditingISideEffectRepository,
          useValue: {
            deleteById: (id) => {
              /**/
            },
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(AuditingDeleteSideEffectByIdService);
    repository = module.get(AuditingISideEffectRepository);
    mockRepository = module.get(AuditingMockSideEffectRepository);
  });

  describe('main', () => {
    test('AuditingDeleteSideEffectByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should delete sideEffect and emit event', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(
        await service.main(
          new AuditingSideEffectId(auditingMockSideEffectData[0].id),
          {},
        ),
      ).toBe(undefined);
    });
  });
});
