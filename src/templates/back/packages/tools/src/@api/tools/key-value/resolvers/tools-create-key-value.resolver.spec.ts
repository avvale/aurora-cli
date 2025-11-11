/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsCreateKeyValueInput } from '@api/graphql';
import {
    ToolsCreateKeyValueHandler,
    ToolsCreateKeyValueResolver,
} from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateKeyValueResolver', () => {
    let resolver: ToolsCreateKeyValueResolver;
    let handler: ToolsCreateKeyValueHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsCreateKeyValueResolver,
                {
                    provide: ToolsCreateKeyValueHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<ToolsCreateKeyValueResolver>(
            ToolsCreateKeyValueResolver,
        );
        handler = module.get<ToolsCreateKeyValueHandler>(
            ToolsCreateKeyValueHandler,
        );
    });

    test('ToolsCreateKeyValueResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsCreateKeyValueResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an keyValue created', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(toolsMockKeyValueData[0])),
            );
            expect(
                await resolver.main(
                    <ToolsCreateKeyValueInput>toolsMockKeyValueData[0],
                ),
            ).toBe(toolsMockKeyValueData[0]);
        });
    });
});
