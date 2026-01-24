/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ToolsPaginateProceduresHandler,
  ToolsPaginateProceduresResolver,
} from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsPaginateProceduresResolver', () => {
  let resolver: ToolsPaginateProceduresResolver;
  let handler: ToolsPaginateProceduresHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsPaginateProceduresResolver,
        {
          provide: ToolsPaginateProceduresHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<ToolsPaginateProceduresResolver>(
      ToolsPaginateProceduresResolver,
    );
    handler = module.get<ToolsPaginateProceduresHandler>(
      ToolsPaginateProceduresHandler,
    );
  });

  test('ToolsPaginateProceduresResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('ToolsPaginateProceduresResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a toolsMockProcedureData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: toolsMockProcedureData,
            }),
          ),
      );
      expect(await resolver.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: toolsMockProcedureData,
      });
    });
  });
});
