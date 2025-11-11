/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsDeleteKeyValueByIdHandler,
    ToolsDeleteKeyValueByIdResolver,
} from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteKeyValueByIdResolver', () => {
    let resolver: ToolsDeleteKeyValueByIdResolver;
    let handler: ToolsDeleteKeyValueByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsDeleteKeyValueByIdResolver,
                {
                    provide: ToolsDeleteKeyValueByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<ToolsDeleteKeyValueByIdResolver>(
            ToolsDeleteKeyValueByIdResolver,
        );
        handler = module.get<ToolsDeleteKeyValueByIdHandler>(
            ToolsDeleteKeyValueByIdHandler,
        );
    });

    test('ToolsDeleteKeyValueByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsDeleteKeyValueByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an keyValue deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(toolsMockKeyValueData[0])),
            );
            expect(await resolver.main(toolsMockKeyValueData[0].id)).toBe(
                toolsMockKeyValueData[0],
            );
        });
    });
});
