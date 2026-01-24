/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsUpdateProceduresInput } from '@api/graphql';
import {
  ToolsUpdateProceduresHandler,
  ToolsUpdateProceduresResolver,
} from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateProceduresResolver', () => {
  let resolver: ToolsUpdateProceduresResolver;
  let handler: ToolsUpdateProceduresHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsUpdateProceduresResolver,
        {
          provide: ToolsUpdateProceduresHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<ToolsUpdateProceduresResolver>(
      ToolsUpdateProceduresResolver,
    );
    handler = module.get<ToolsUpdateProceduresHandler>(
      ToolsUpdateProceduresHandler,
    );
  });

  test('ToolsUpdateProceduresResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('ToolsUpdateProceduresResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a procedures updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockProcedureData[0])),
        );
      expect(
        await resolver.main(
          <ToolsUpdateProceduresInput>toolsMockProcedureData[0],
        ),
      ).toBe(toolsMockProcedureData[0]);
    });
  });
});
