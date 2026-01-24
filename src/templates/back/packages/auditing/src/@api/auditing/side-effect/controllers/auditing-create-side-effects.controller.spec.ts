import {
  AuditingCreateSideEffectsController,
  AuditingCreateSideEffectsHandler,
} from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingCreateSideEffectsController', () => {
  let controller: AuditingCreateSideEffectsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditingCreateSideEffectsController],
      providers: [
        {
          provide: AuditingCreateSideEffectsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<AuditingCreateSideEffectsController>(
      AuditingCreateSideEffectsController,
    );
  });

  describe('main', () => {
    test('AuditingCreateSideEffectsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an auditingMockSideEffectData created', async () => {
      expect(await controller.main(auditingMockSideEffectData)).toBe(undefined);
    });
  });
});
