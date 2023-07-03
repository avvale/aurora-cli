import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonCreateAdministrativeAreasLevel1Resolver } from './common-create-administrative-areas-level-1.resolver';
import { CommonCreateAdministrativeAreasLevel1Handler } from '../handlers/common-create-administrative-areas-level-1.handler';
import { CommonCreateAdministrativeAreaLevel1Input } from '@api/graphql';

// sources
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1/infrastructure/mock/common-mock-administrative-area-level-1.data';

describe('CommonCreateAdministrativeAreasLevel1Resolver', () =>
{
    let resolver: CommonCreateAdministrativeAreasLevel1Resolver;
    let handler: CommonCreateAdministrativeAreasLevel1Handler;

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
        handler = module.get<CommonCreateAdministrativeAreasLevel1Handler>(CommonCreateAdministrativeAreasLevel1Handler);
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