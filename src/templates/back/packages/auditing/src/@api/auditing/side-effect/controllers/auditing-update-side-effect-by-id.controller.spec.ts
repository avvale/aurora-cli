import {
  AuditingUpdateSideEffectByIdController,
  AuditingUpdateSideEffectByIdHandler,
} from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingUpdateSideEffectByIdController', () => {
  let controller: AuditingUpdateSideEffectByIdController;
  let handler: AuditingUpdateSideEffectByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AuditingUpdateSideEffectByIdController],
      providers: [
        {
          provide: AuditingUpdateSideEffectByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<AuditingUpdateSideEffectByIdController>(
      AuditingUpdateSideEffectByIdController,
    );
    handler = module.get<AuditingUpdateSideEffectByIdHandler>(
      AuditingUpdateSideEffectByIdHandler,
    );
  });

  describe('main', () => {
    test('AuditingUpdateSideEffectByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a sideEffect updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(auditingMockSideEffectData[0])),
        );
      expect(await controller.main(auditingMockSideEffectData[0])).toBe(
        auditingMockSideEffectData[0],
      );
    });
  });
});
