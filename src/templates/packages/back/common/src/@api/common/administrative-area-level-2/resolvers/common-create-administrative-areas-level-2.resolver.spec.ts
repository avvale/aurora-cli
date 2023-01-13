import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonCreateAdministrativeAreasLevel2Resolver } from './common-create-administrative-areas-level-2.resolver';
import { CommonCreateAdministrativeAreasLevel2Handler } from '../handlers/common-create-administrative-areas-level-2.handler';
import { CommonCreateAdministrativeAreaLevel2Input } from '@api/graphql';

// sources
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

describe('CommonCreateAdministrativeAreasLevel2Resolver', () =>
{
    let resolver: CommonCreateAdministrativeAreasLevel2Resolver;
    let handler: CommonCreateAdministrativeAreasLevel2Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateAdministrativeAreasLevel2Resolver,
                {
                    provide : CommonCreateAdministrativeAreasLevel2Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonCreateAdministrativeAreasLevel2Resolver>(CommonCreateAdministrativeAreasLevel2Resolver);
        handler = module.get<CommonCreateAdministrativeAreasLevel2Handler>(CommonCreateAdministrativeAreasLevel2Handler);
    });

    test('CommonCreateAdministrativeAreasLevel2Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonCreateAdministrativeAreasLevel2Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an administrativeAreasLevel2 created', async () =>
        {
            expect(await resolver.main(<CommonCreateAdministrativeAreaLevel2Input[]>administrativeAreasLevel2)).toBe(undefined);
        });
    });
});