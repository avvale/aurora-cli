import { CommonCreateAdministrativeAreasLevel1Handler, CommonCreateAdministrativeAreasLevel1Resolver } from '@api/common/administrative-area-level-1';
import { CommonCreateAdministrativeAreaLevel1Input } from '@api/graphql';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAdministrativeAreasLevel1Resolver', () =>
{
    let resolver: CommonCreateAdministrativeAreasLevel1Resolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateAdministrativeAreasLevel1Resolver,
                {
                    provide : CommonCreateAdministrativeAreasLevel1Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonCreateAdministrativeAreasLevel1Resolver>(CommonCreateAdministrativeAreasLevel1Resolver);
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
            expect(await resolver.main(<CommonCreateAdministrativeAreaLevel1Input[]>commonMockAdministrativeAreaLevel1Data)).toBe(undefined);
        });
    });
});
