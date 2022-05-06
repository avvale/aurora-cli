/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { CommonUpdateLangResolver } from './common-update-lang.resolver';
import { CommonUpdateLangInput } from './../../../../graphql';

// sources
import { langs } from '../../../../@apps/common/lang/infrastructure/seeds/lang.seed';

describe('CommonUpdateLangResolver', () =>
{
    let resolver: CommonUpdateLangResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateLangResolver,
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

        resolver    = module.get<CommonUpdateLangResolver>(CommonUpdateLangResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonUpdateLangResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateLangResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a lang created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(langs[0])));
            expect(await resolver.main(<CommonUpdateLangInput>langs[0])).toBe(langs[0]);
        });
    });
});