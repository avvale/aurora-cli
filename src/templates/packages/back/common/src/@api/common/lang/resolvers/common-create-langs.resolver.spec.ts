import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { CommonCreateLangsResolver } from './common-create-langs.resolver';
import { langs } from '../../../../@apps/common/lang/infrastructure/seeds/lang.seed';
import { CommonCreateLangInput } from './../../../../graphql';

describe('CommonCreateLangsResolver', () =>
{
    let resolver: CommonCreateLangsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateLangsResolver,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    }
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    }
                },
            ]
        }).compile();

        resolver    = module.get<CommonCreateLangsResolver>(CommonCreateLangsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
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
            expect(await resolver.main(<CommonCreateLangInput[]>langs)).toBe(true);
        });
    });
});