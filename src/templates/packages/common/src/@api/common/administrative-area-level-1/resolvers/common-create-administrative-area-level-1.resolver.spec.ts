/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { CommonCreateAdministrativeAreaLevel1Resolver } from './common-create-administrative-area-level-1.resolver';
import { CommonCreateAdministrativeAreaLevel1Input } from './../../../../graphql';

// sources
import { administrativeAreasLevel1 } from '../../../../@apps/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('CommonCreateAdministrativeAreaLevel1Resolver', () =>
{
    let resolver: CommonCreateAdministrativeAreaLevel1Resolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonCreateAdministrativeAreaLevel1Resolver,
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

        resolver    = module.get<CommonCreateAdministrativeAreaLevel1Resolver>(CommonCreateAdministrativeAreaLevel1Resolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonCreateAdministrativeAreaLevel1Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonCreateAdministrativeAreaLevel1Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an administrativeAreaLevel1 created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel1[0])));
            expect(await resolver.main(<CommonCreateAdministrativeAreaLevel1Input>administrativeAreasLevel1[0])).toBe(administrativeAreasLevel1[0]);
        });
    });
});