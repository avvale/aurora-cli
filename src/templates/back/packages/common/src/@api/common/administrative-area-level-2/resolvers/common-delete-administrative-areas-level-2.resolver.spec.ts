/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonDeleteAdministrativeAreasLevel2Handler, CommonDeleteAdministrativeAreasLevel2Resolver } from '@api/common/administrative-area-level-2';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAdministrativeAreasLevel2Resolver', () =>
{
    let resolver: CommonDeleteAdministrativeAreasLevel2Resolver;
    let handler: CommonDeleteAdministrativeAreasLevel2Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonDeleteAdministrativeAreasLevel2Resolver,
                {
                    provide : CommonDeleteAdministrativeAreasLevel2Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonDeleteAdministrativeAreasLevel2Resolver>(CommonDeleteAdministrativeAreasLevel2Resolver);
        handler = module.get<CommonDeleteAdministrativeAreasLevel2Handler>(CommonDeleteAdministrativeAreasLevel2Handler);
    });

    test('CommonDeleteAdministrativeAreasLevel2Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreasLevel2Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an commonMockAdministrativeAreaLevel2Data deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel2Data)));
            expect(await resolver.main()).toBe(commonMockAdministrativeAreaLevel2Data);
        });
    });
});
