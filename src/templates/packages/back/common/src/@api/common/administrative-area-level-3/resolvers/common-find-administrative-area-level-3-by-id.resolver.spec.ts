/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonFindAdministrativeAreaLevel3ByIdResolver } from './common-find-administrative-area-level-3-by-id.resolver';
import { CommonFindAdministrativeAreaLevel3ByIdHandler } from '../handlers/common-find-administrative-area-level-3-by-id.handler';

// sources
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

describe('CommonFindAdministrativeAreaLevel3ByIdResolver', () =>
{
    let resolver: CommonFindAdministrativeAreaLevel3ByIdResolver;
    let handler: CommonFindAdministrativeAreaLevel3ByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonFindAdministrativeAreaLevel3ByIdResolver,
                {
                    provide : CommonFindAdministrativeAreaLevel3ByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonFindAdministrativeAreaLevel3ByIdResolver>(CommonFindAdministrativeAreaLevel3ByIdResolver);
        handler = module.get<CommonFindAdministrativeAreaLevel3ByIdHandler>(CommonFindAdministrativeAreaLevel3ByIdHandler);
    });

    test('CommonFindAdministrativeAreaLevel3ByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonFindAdministrativeAreaLevel3ByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an administrativeAreaLevel3 by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel3[0])));
            expect(await resolver.main(administrativeAreasLevel3[0].id)).toBe(administrativeAreasLevel3[0]);
        });
    });
});