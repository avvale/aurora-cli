/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingDeleteSideEffectByIdHandler } from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingDeleteSideEffectByIdController', () => {
  let handler: AuditingDeleteSideEffectByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        AuditingDeleteSideEffectByIdHandler,
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

    handler = module.get<AuditingDeleteSideEffectByIdHandler>(
      AuditingDeleteSideEffectByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('AuditingDeleteSideEffectByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an sideEffect deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(auditingMockSideEffectData[0])),
        );
      expect(
        await handler.main(
          auditingMockSideEffectData[0].id,
          {},
          'Europe/Madrid',
        ),
      ).toBe(auditingMockSideEffectData[0]);
    });
  });
});
