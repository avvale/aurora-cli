/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonUpdateAdministrativeAreasLevel1Resolver } from './common-update-administrative-areas-level-1.resolver';
import { CommonUpdateAdministrativeAreasLevel1Handler } from '../handlers/common-update-administrative-areas-level-1.handler';
import { CommonUpdateAdministrativeAreasLevel1Input } from '@api/graphql';

// sources
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1/infrastructure/mock/common-mock-administrative-area-level-1.data';

describe('CommonUpdateAdministrativeAreasLevel1Resolver', () =>
{
    let resolver: CommonUpdateAdministrativeAreasLevel1Resolver;
    let handler: CommonUpdateAdministrativeAreasLevel1Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateAdministrativeAreasLevel1Resolver,
                {
                    provide : CommonUpdateAdministrativeAreasLevel1Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonUpdateAdministrativeAreasLevel1Resolver>(CommonUpdateAdministrativeAreasLevel1Resolver);
        handler = module.get<CommonUpdateAdministrativeAreasLevel1Handler>(CommonUpdateAdministrativeAreasLevel1Handler);
    });

    test('CommonUpdateAdministrativeAreasLevel1Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateAdministrativeAreasLevel1Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a administrativeAreasLevel1 updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel1Data[0])));
            expect(await resolver.main(<CommonUpdateAdministrativeAreasLevel1Input>commonMockAdministrativeAreaLevel1Data[0])).toBe(commonMockAdministrativeAreaLevel1Data[0]);
        });
    });
});