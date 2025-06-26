/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsGetKeyValuesHandler, ToolsGetKeyValuesResolver } from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsGetKeyValuesResolver', () =>
{
    let resolver: ToolsGetKeyValuesResolver;
    let handler: ToolsGetKeyValuesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsGetKeyValuesResolver,
                {
                    provide : ToolsGetKeyValuesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<ToolsGetKeyValuesResolver>(ToolsGetKeyValuesResolver);
        handler = module.get<ToolsGetKeyValuesHandler>(ToolsGetKeyValuesHandler);
    });

    test('ToolsGetKeyValuesResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('ToolsGetKeyValuesResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a toolsMockKeyValueData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(toolsMockKeyValueData)));
            expect(await resolver.main()).toBe(toolsMockKeyValueData);
        });
    });
});
