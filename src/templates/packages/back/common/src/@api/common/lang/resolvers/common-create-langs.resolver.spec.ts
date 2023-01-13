import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonCreateLangsResolver } from './common-create-langs.resolver';
import { CommonCreateLangsHandler } from '../handlers/common-create-langs.handler';
import { CommonCreateLangInput } from '@api/graphql';

// sources
import { langs } from '@app/common/lang/infrastructure/seeds/lang.seed';

describe('CommonCreateLangsResolver', () =>
{
    let resolver: CommonCreateLangsResolver;
    let handler: CommonCreateLangsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateLangsResolver,
                {
                    provide : CommonCreateLangsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonCreateLangsResolver>(CommonCreateLangsResolver);
        handler = module.get<CommonCreateLangsHandler>(CommonCreateLangsHandler);
    });

    test('CommonCreateLangsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonCreateLangsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an langs created', async () =>
        {
            expect(await resolver.main(<CommonCreateLangInput[]>langs)).toBe(undefined);
        });
    });
});