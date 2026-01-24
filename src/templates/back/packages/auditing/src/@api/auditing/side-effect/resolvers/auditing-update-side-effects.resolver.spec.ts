/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AuditingUpdateSideEffectsHandler,
  AuditingUpdateSideEffectsResolver,
} from '@api/auditing/side-effect';
import { AuditingUpdateSideEffectsInput } from '@api/graphql';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingUpdateSideEffectsResolver', () => {
  let resolver: AuditingUpdateSideEffectsResolver;
  let handler: AuditingUpdateSideEffectsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        AuditingUpdateSideEffectsResolver,
        {
          provide: AuditingUpdateSideEffectsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<AuditingUpdateSideEffectsResolver>(
      AuditingUpdateSideEffectsResolver,
    );
    handler = module.get<AuditingUpdateSideEffectsHandler>(
      AuditingUpdateSideEffectsHandler,
    );
  });

  test('AuditingUpdateSideEffectsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('AuditingUpdateSideEffectsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a sideEffects updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(auditingMockSideEffectData[0])),
        );
      expect(
        await resolver.main(
          <AuditingUpdateSideEffectsInput>auditingMockSideEffectData[0],
        ),
      ).toBe(auditingMockSideEffectData[0]);
    });
  });
});
