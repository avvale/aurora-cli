/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonFindLangResolver } from './common-find-lang.resolver';
import { CommonFindLangHandler } from '../handlers/common-find-lang.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/seeds/lang.seed';

describe('CommonFindLangResolver', () =>
{
    let resolver: CommonFindLangResolver;
    let handler: CommonFindLangHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonFindLangResolver,
                {
                    provide : CommonFindLangHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonFindLangResolver>(CommonFindLangResolver);
        handler = module.get<CommonFindLangHandler>(CommonFindLangHandler);
    });

    test('CommonFindLangResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonFindLangResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a lang', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(langs[0])));
            expect(await resolver.main()).toBe(langs[0]);
        });
    });
});