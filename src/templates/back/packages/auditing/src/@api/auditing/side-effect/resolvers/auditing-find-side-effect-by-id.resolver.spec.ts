/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AuditingFindSideEffectByIdHandler,
  AuditingFindSideEffectByIdResolver,
} from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingFindSideEffectByIdResolver', () => {
  let resolver: AuditingFindSideEffectByIdResolver;
  let handler: AuditingFindSideEffectByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        AuditingFindSideEffectByIdResolver,
        {
          provide: AuditingFindSideEffectByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<AuditingFindSideEffectByIdResolver>(
      AuditingFindSideEffectByIdResolver,
    );
    handler = module.get<AuditingFindSideEffectByIdHandler>(
      AuditingFindSideEffectByIdHandler,
    );
  });

  test('AuditingFindSideEffectByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('AuditingFindSideEffectByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an sideEffect by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(auditingMockSideEffectData[0])),
        );
      expect(await resolver.main(auditingMockSideEffectData[0].id)).toBe(
        auditingMockSideEffectData[0],
      );
    });
  });
});
