/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonFindAdministrativeAreaLevel2Resolver } from './common-find-administrative-area-level-2.resolver';
import { CommonFindAdministrativeAreaLevel2Handler } from '../handlers/common-find-administrative-area-level-2.handler';

// sources
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

describe('CommonFindAdministrativeAreaLevel2Resolver', () =>
{
    let resolver: CommonFindAdministrativeAreaLevel2Resolver;
    let handler: CommonFindAdministrativeAreaLevel2Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonFindAdministrativeAreaLevel2Resolver,
                {
                    provide : CommonFindAdministrativeAreaLevel2Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonFindAdministrativeAreaLevel2Resolver>(CommonFindAdministrativeAreaLevel2Resolver);
        handler = module.get<CommonFindAdministrativeAreaLevel2Handler>(CommonFindAdministrativeAreaLevel2Handler);
    });

    test('CommonFindAdministrativeAreaLevel2Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonFindAdministrativeAreaLevel2Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a administrativeAreaLevel2', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel2[0])));
            expect(await resolver.main()).toBe(administrativeAreasLevel2[0]);
        });
    });
});