/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsFindKeyValueHandler, ToolsFindKeyValueResolver } from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindKeyValueResolver', () =>
{
    let resolver: ToolsFindKeyValueResolver;
    let handler: ToolsFindKeyValueHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsFindKeyValueResolver,
                {
                    provide : ToolsFindKeyValueHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<ToolsFindKeyValueResolver>(ToolsFindKeyValueResolver);
        handler = module.get<ToolsFindKeyValueHandler>(ToolsFindKeyValueHandler);
    });

    test('ToolsFindKeyValueResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('ToolsFindKeyValueResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a keyValue', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(toolsMockKeyValueData[0])));
            expect(await resolver.main()).toBe(toolsMockKeyValueData[0]);
        });
    });
});
