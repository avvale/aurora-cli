/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsUpdateKeyValuesInput } from '@api/graphql';
import { ToolsUpdateKeyValuesHandler, ToolsUpdateKeyValuesResolver } from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateKeyValuesResolver', () =>
{
    let resolver: ToolsUpdateKeyValuesResolver;
    let handler: ToolsUpdateKeyValuesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsUpdateKeyValuesResolver,
                {
                    provide : ToolsUpdateKeyValuesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<ToolsUpdateKeyValuesResolver>(ToolsUpdateKeyValuesResolver);
        handler = module.get<ToolsUpdateKeyValuesHandler>(ToolsUpdateKeyValuesHandler);
    });

    test('ToolsUpdateKeyValuesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('ToolsUpdateKeyValuesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a keyValues updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(toolsMockKeyValueData[0])));
            expect(await resolver.main(<ToolsUpdateKeyValuesInput>toolsMockKeyValueData[0])).toBe(toolsMockKeyValueData[0]);
        });
    });
});
