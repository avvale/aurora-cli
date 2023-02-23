/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonUpdateLangsResolver } from './common-update-langs.resolver';
import { CommonUpdateLangsHandler } from '../handlers/common-update-langs.handler';
import { CommonUpdateLangsInput } from '@api/graphql';

// sources
import { langs } from '@app/common/lang/infrastructure/seeds/lang.seed';

describe('CommonUpdateLangsResolver', () =>
{
    let resolver: CommonUpdateLangsResolver;
    let handler: CommonUpdateLangsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateLangsResolver,
                {
                    provide : CommonUpdateLangsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonUpdateLangsResolver>(CommonUpdateLangsResolver);
        handler = module.get<CommonUpdateLangsHandler>(CommonUpdateLangsHandler);
    });

    test('CommonUpdateLangsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateLangsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a langs updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(langs[0])));
            expect(await resolver.main(<CommonUpdateLangsInput>langs[0])).toBe(langs[0]);
        });
    });
});