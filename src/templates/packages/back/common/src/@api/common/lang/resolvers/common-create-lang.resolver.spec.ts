/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonCreateLangResolver } from './common-create-lang.resolver';
import { CommonCreateLangHandler } from '../handlers/common-create-lang.handler';
import { CommonCreateLangInput } from '@api/graphql';

// sources
import { langs } from '@app/common/lang/infrastructure/seeds/lang.seed';

describe('CommonCreateLangResolver', () =>
{
    let resolver: CommonCreateLangResolver;
    let handler: CommonCreateLangHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonCreateLangResolver,
                {
                    provide : CommonCreateLangHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonCreateLangResolver>(CommonCreateLangResolver);
        handler = module.get<CommonCreateLangHandler>(CommonCreateLangHandler);
    });

    test('CommonCreateLangResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonCreateLangResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an lang created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(langs[0])));
            expect(await resolver.main(<CommonCreateLangInput>langs[0])).toBe(langs[0]);
        });
    });
});