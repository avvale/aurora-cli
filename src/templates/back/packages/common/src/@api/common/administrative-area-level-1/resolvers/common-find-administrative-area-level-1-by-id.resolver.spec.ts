/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonFindAdministrativeAreaLevel1ByIdResolver } from './common-find-administrative-area-level-1-by-id.resolver';
import { CommonFindAdministrativeAreaLevel1ByIdHandler } from '../handlers/common-find-administrative-area-level-1-by-id.handler';

// sources
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1/infrastructure/mock/common-mock-administrative-area-level-1.data';

describe('CommonFindAdministrativeAreaLevel1ByIdResolver', () =>
{
    let resolver: CommonFindAdministrativeAreaLevel1ByIdResolver;
    let handler: CommonFindAdministrativeAreaLevel1ByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonFindAdministrativeAreaLevel1ByIdResolver,
                {
                    provide : CommonFindAdministrativeAreaLevel1ByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonFindAdministrativeAreaLevel1ByIdResolver>(CommonFindAdministrativeAreaLevel1ByIdResolver);
        handler = module.get<CommonFindAdministrativeAreaLevel1ByIdHandler>(CommonFindAdministrativeAreaLevel1ByIdHandler);
    });

    test('CommonFindAdministrativeAreaLevel1ByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonFindAdministrativeAreaLevel1ByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an administrativeAreaLevel1 by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel1Data[0])));
            expect(await resolver.main(commonMockAdministrativeAreaLevel1Data[0].id)).toBe(commonMockAdministrativeAreaLevel1Data[0]);
        });
    });
});