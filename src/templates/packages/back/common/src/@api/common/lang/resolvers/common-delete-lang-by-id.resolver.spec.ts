/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteLangByIdResolver } from './common-delete-lang-by-id.resolver';
import { CommonDeleteLangByIdHandler } from '../handlers/common-delete-lang-by-id.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/seeds/lang.seed';

describe('CommonDeleteLangByIdResolver', () =>
{
    let resolver: CommonDeleteLangByIdResolver;
    let handler: CommonDeleteLangByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonDeleteLangByIdResolver,
                {
                    provide : CommonDeleteLangByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonDeleteLangByIdResolver>(CommonDeleteLangByIdResolver);
        handler = module.get<CommonDeleteLangByIdHandler>(CommonDeleteLangByIdHandler);
    });

    test('CommonDeleteLangByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonDeleteLangByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an lang deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(langs[0])));
            expect(await resolver.main(langs[0].id)).toBe(langs[0]);
        });
    });
});