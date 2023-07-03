/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonFindAdministrativeAreaLevel1Resolver } from './common-find-administrative-area-level-1.resolver';
import { CommonFindAdministrativeAreaLevel1Handler } from '../handlers/common-find-administrative-area-level-1.handler';

// sources
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1/infrastructure/mock/common-mock-administrative-area-level-1.data';

describe('CommonFindAdministrativeAreaLevel1Resolver', () =>
{
    let resolver: CommonFindAdministrativeAreaLevel1Resolver;
    let handler: CommonFindAdministrativeAreaLevel1Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonFindAdministrativeAreaLevel1Resolver,
                {
                    provide : CommonFindAdministrativeAreaLevel1Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonFindAdministrativeAreaLevel1Resolver>(CommonFindAdministrativeAreaLevel1Resolver);
        handler = module.get<CommonFindAdministrativeAreaLevel1Handler>(CommonFindAdministrativeAreaLevel1Handler);
    });

    test('CommonFindAdministrativeAreaLevel1Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonFindAdministrativeAreaLevel1Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a administrativeAreaLevel1', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel1Data[0])));
            expect(await resolver.main()).toBe(commonMockAdministrativeAreaLevel1Data[0]);
        });
    });
});