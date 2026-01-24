/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ToolsGetProceduresHandler,
  ToolsGetProceduresResolver,
} from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsGetProceduresResolver', () => {
  let resolver: ToolsGetProceduresResolver;
  let handler: ToolsGetProceduresHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsGetProceduresResolver,
        {
          provide: ToolsGetProceduresHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<ToolsGetProceduresResolver>(
      ToolsGetProceduresResolver,
    );
    handler = module.get<ToolsGetProceduresHandler>(ToolsGetProceduresHandler);
  });

  test('ToolsGetProceduresResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('ToolsGetProceduresResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a toolsMockProcedureData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockProcedureData)),
        );
      expect(await resolver.main()).toBe(toolsMockProcedureData);
    });
  });
});
