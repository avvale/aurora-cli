import { CommonCreateAdministrativeAreasLevel3Handler, CommonCreateAdministrativeAreasLevel3Resolver } from '@api/common/administrative-area-level-3';
import { CommonCreateAdministrativeAreaLevel3Input } from '@api/graphql';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAdministrativeAreasLevel3Resolver', () =>
{
    let resolver: CommonCreateAdministrativeAreasLevel3Resolver;

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
