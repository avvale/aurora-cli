import { AuditingCreateSideEffectsHandler } from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingCreateSideEffectsHandler', () => {
  let handler: AuditingCreateSideEffectsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditingCreateSideEffectsHandler,
        {
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<AuditingCreateSideEffectsHandler>(
      AuditingCreateSideEffectsHandler,
    );
  });

  describe('main', () => {
    test('AuditingCreateSideEffectsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an auditingMockSideEffectData created', async () => {
      expect(await handler.main(auditingMockSideEffectData)).toBe(true);
    });
  });
});
