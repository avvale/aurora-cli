/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingUpdateSideEffectByIdHandler } from '@api/auditing/side-effect';
import { AuditingUpdateSideEffectByIdInput } from '@api/graphql';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingUpdateSideEffectByIdHandler', () => {
  let handler: AuditingUpdateSideEffectByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        AuditingUpdateSideEffectByIdHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
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

    handler = module.get<AuditingUpdateSideEffectByIdHandler>(
      AuditingUpdateSideEffectByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('AuditingUpdateSideEffectByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('AuditingUpdateSideEffectByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a sideEffect updated', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(auditingMockSideEffectData[0])),
        );
      expect(
        await handler.main(
          <AuditingUpdateSideEffectByIdInput>auditingMockSideEffectData[0],
          {},
          'Europe/Madrid',
        ),
      ).toBe(auditingMockSideEffectData[0]);
    });
  });
});
