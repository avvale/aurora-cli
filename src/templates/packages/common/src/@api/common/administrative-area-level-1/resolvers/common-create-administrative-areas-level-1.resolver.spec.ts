import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { CommonCreateAdministrativeAreasLevel1Resolver } from './common-create-administrative-areas-level-1.resolver';
import { administrativeAreasLevel1 } from '../../../../@apps/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';
import { CommonCreateAdministrativeAreaLevel1Input } from './../../../../graphql';

describe('CommonCreateAdministrativeAreasLevel1Resolver', () =>
{
    let resolver: CommonCreateAdministrativeAreasLevel1Resolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateAdministrativeAreasLevel1Resolver,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver    = module.get<CommonCreateAdministrativeAreasLevel1Resolver>(CommonCreateAdministrativeAreasLevel1Resolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonCreateAdministrativeAreasLevel1Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonCreateAdministrativeAreasLevel1Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an administrativeAreasLevel1 created', async () =>
        {
            expect(await resolver.main(<CommonCreateAdministrativeAreaLevel1Input[]>administrativeAreasLevel1)).toBe(true);
        });
    });
});