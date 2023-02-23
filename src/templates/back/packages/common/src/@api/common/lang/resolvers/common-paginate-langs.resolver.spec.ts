/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonPaginateLangsResolver } from './common-paginate-langs.resolver';
import { CommonPaginateLangsHandler } from '../handlers/common-paginate-langs.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/seeds/lang.seed';

describe('CommonPaginateLangsResolver', () =>
{
    let resolver: CommonPaginateLangsResolver;
    let handler: CommonPaginateLangsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonPaginateLangsResolver,
                {
                    provide : CommonPaginateLangsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver    = module.get<CommonPaginateLangsResolver>(CommonPaginateLangsResolver);
        handler = module.get<CommonPaginateLangsHandler>(CommonPaginateLangsHandler);
    });

    test('CommonPaginateLangsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonPaginateLangsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a langs', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : langs,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : langs,
            });
        });
    });
});