/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsUpdateKeyValueByIdInput } from '@api/graphql';
import {
    ToolsUpdateKeyValueByIdHandler,
    ToolsUpdateKeyValueByIdResolver,
} from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateKeyValueByIdResolver', () => {
    let resolver: ToolsUpdateKeyValueByIdResolver;
    let handler: ToolsUpdateKeyValueByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsUpdateKeyValueByIdResolver,
                {
                    provide: ToolsUpdateKeyValueByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<ToolsUpdateKeyValueByIdResolver>(
            ToolsUpdateKeyValueByIdResolver,
        );
        handler = module.get<ToolsUpdateKeyValueByIdHandler>(
            ToolsUpdateKeyValueByIdHandler,
        );
    });

    test('ToolsUpdateKeyValueByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsUpdateKeyValueByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a keyValue by id updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(toolsMockKeyValueData[0])),
            );
            expect(
                await resolver.main(
                    <ToolsUpdateKeyValueByIdInput>toolsMockKeyValueData[0],
                ),
            ).toBe(toolsMockKeyValueData[0]);
        });
    });
});
