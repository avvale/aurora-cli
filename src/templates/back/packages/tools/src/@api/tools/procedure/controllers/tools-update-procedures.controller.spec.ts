import {
  ToolsUpdateProceduresController,
  ToolsUpdateProceduresHandler,
} from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateProceduresController', () => {
  let controller: ToolsUpdateProceduresController;
  let handler: ToolsUpdateProceduresHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ToolsUpdateProceduresController],
      providers: [
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

    controller = module.get<ToolsUpdateProceduresController>(
      ToolsUpdateProceduresController,
    );
    handler = module.get<ToolsUpdateProceduresHandler>(
      ToolsUpdateProceduresHandler,
    );
  });

  describe('main', () => {
    test('ToolsUpdateProceduresController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a procedures updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockProcedureData[0])),
        );
      expect(await controller.main(toolsMockProcedureData[0])).toBe(
        toolsMockProcedureData[0],
      );
    });
  });
});
