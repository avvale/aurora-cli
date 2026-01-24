/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuditingRollbackSideEffectHandler } from '../handlers/auditing-rollback-side-effect.handler';
import { AuditingRollbackSideEffectResolver } from './auditing-rollback-side-effect.resolver';

describe('AuditingRollbackSideEffectResolver', () => {
  let resolver: AuditingRollbackSideEffectResolver;
  let handler: AuditingRollbackSideEffectHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        AuditingRollbackSideEffectResolver,
        {
          provide: AuditingRollbackSideEffectHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<AuditingRollbackSideEffectResolver>(
      AuditingRollbackSideEffectResolver,
    );
    handler = module.get<AuditingRollbackSideEffectHandler>(
      AuditingRollbackSideEffectHandler,
    );
  });

  test('AuditingRollbackSideEffectResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('AuditingRollbackSideEffectResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });
  });
});
