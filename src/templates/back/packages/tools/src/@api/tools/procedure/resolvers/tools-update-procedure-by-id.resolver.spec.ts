/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsUpdateProcedureByIdInput } from '@api/graphql';
import {
    ToolsUpdateProcedureByIdHandler,
    ToolsUpdateProcedureByIdResolver,
} from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateProcedureByIdResolver', () => {
    let resolver: ToolsUpdateProcedureByIdResolver;
    let handler: ToolsUpdateProcedureByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsUpdateProcedureByIdResolver,
                {
                    provide: ToolsUpdateProcedureByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<ToolsUpdateProcedureByIdResolver>(
            ToolsUpdateProcedureByIdResolver,
        );
        handler = module.get<ToolsUpdateProcedureByIdHandler>(
            ToolsUpdateProcedureByIdHandler,
        );
    });

    test('ToolsUpdateProcedureByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsUpdateProcedureByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a procedure by id updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(toolsMockProcedureData[0]),
                    ),
            );
            expect(
                await resolver.main(
                    <ToolsUpdateProcedureByIdInput>toolsMockProcedureData[0],
                ),
            ).toBe(toolsMockProcedureData[0]);
        });
    });
});
