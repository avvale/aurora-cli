/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpdateAdministrativeAreasLevel3Handler, CommonUpdateAdministrativeAreasLevel3Resolver } from '@api/common/administrative-area-level-3';
import { CommonUpdateAdministrativeAreasLevel3Input } from '@api/graphql';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAdministrativeAreasLevel3Resolver', () =>
{
    let resolver: CommonUpdateAdministrativeAreasLevel3Resolver;
    let handler: CommonUpdateAdministrativeAreasLevel3Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateAdministrativeAreasLevel3Resolver,
                {
                    provide : CommonUpdateAdministrativeAreasLevel3Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonUpdateAdministrativeAreasLevel3Resolver>(CommonUpdateAdministrativeAreasLevel3Resolver);
        handler = module.get<CommonUpdateAdministrativeAreasLevel3Handler>(CommonUpdateAdministrativeAreasLevel3Handler);
    });

    test('CommonUpdateAdministrativeAreasLevel3Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateAdministrativeAreasLevel3Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a administrativeAreasLevel3 updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel3Data[0])));
            expect(await resolver.main(<CommonUpdateAdministrativeAreasLevel3Input>commonMockAdministrativeAreaLevel3Data[0])).toBe(commonMockAdministrativeAreaLevel3Data[0]);
        });
    });
});
