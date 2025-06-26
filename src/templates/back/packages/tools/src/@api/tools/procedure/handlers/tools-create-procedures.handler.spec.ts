import { ToolsCreateProceduresHandler } from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateProceduresHandler', () =>
{
    let handler: ToolsCreateProceduresHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsCreateProceduresHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<ToolsCreateProceduresHandler>(ToolsCreateProceduresHandler);
    });

    describe('main', () =>
    {
        test('ToolsCreateProceduresHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an toolsMockProcedureData created', async () =>
        {
            expect(await handler.main(toolsMockProcedureData)).toBe(true);
        });
    });
});
