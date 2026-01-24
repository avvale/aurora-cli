/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ToolsUpScriptProcedureHandler } from '../handlers/tools-up-script-procedure.handler';
import { ToolsUpScriptProcedureController } from './tools-up-script-procedure.controller';

describe('ToolsUpScriptProcedureController', () => {
  let controller: ToolsUpScriptProcedureController;
  let handler: ToolsUpScriptProcedureHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ToolsUpScriptProcedureController],
      providers: [
        {
          provide: ToolsUpScriptProcedureHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<ToolsUpScriptProcedureController>(
      ToolsUpScriptProcedureController,
    );
    handler = module.get<ToolsUpScriptProcedureHandler>(
      ToolsUpScriptProcedureHandler,
    );
  });

  describe('main', () => {
    test('ToolsUpScriptProcedureController should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});
