import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonCreateAdministrativeAreasLevel3Resolver } from './common-create-administrative-areas-level-3.resolver';
import { CommonCreateAdministrativeAreasLevel3Handler } from '../handlers/common-create-administrative-areas-level-3.handler';
import { CommonCreateAdministrativeAreaLevel3Input } from '@api/graphql';

// sources
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3/infrastructure/mock/common-mock-administrative-area-level-3.data';

describe('CommonCreateAdministrativeAreasLevel3Resolver', () =>
{
    let resolver: CommonCreateAdministrativeAreasLevel3Resolver;
    let handler: CommonCreateAdministrativeAreasLevel3Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateAdministrativeAreasLevel3Resolver,
                {
                    provide : CommonCreateAdministrativeAreasLevel3Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonCreateAdministrativeAreasLevel3Resolver>(CommonCreateAdministrativeAreasLevel3Resolver);
        handler = module.get<CommonCreateAdministrativeAreasLevel3Handler>(CommonCreateAdministrativeAreasLevel3Handler);
    });

    test('CommonCreateAdministrativeAreasLevel3Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonCreateAdministrativeAreasLevel3Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an administrativeAreasLevel3 created', async () =>
        {
            expect(await resolver.main(<CommonCreateAdministrativeAreaLevel3Input[]>commonMockAdministrativeAreaLevel3Data)).toBe(undefined);
        });
    });
});