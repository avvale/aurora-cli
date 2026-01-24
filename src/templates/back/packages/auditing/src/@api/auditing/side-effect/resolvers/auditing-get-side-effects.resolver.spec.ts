/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AuditingGetSideEffectsHandler,
  AuditingGetSideEffectsResolver,
} from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingGetSideEffectsResolver', () => {
  let resolver: AuditingGetSideEffectsResolver;
  let handler: AuditingGetSideEffectsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        AuditingGetSideEffectsResolver,
        {
          provide: AuditingGetSideEffectsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<AuditingGetSideEffectsResolver>(
      AuditingGetSideEffectsResolver,
    );
    handler = module.get<AuditingGetSideEffectsHandler>(
      AuditingGetSideEffectsHandler,
    );
  });

  test('AuditingGetSideEffectsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('AuditingGetSideEffectsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a auditingMockSideEffectData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(auditingMockSideEffectData)),
        );
      expect(await resolver.main()).toBe(auditingMockSideEffectData);
    });
  });
});
