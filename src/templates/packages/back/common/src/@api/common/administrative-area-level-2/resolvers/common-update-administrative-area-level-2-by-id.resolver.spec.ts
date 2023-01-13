/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonUpdateAdministrativeAreaLevel2ByIdResolver } from './common-update-administrative-area-level-2-by-id.resolver';
import { CommonUpdateAdministrativeAreaLevel2ByIdHandler } from '../handlers/common-update-administrative-area-level-2-by-id.handler';
import { CommonUpdateAdministrativeAreaLevel2ByIdInput } from '@api/graphql';

// sources
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

describe('CommonUpdateAdministrativeAreaLevel2ByIdResolver', () =>
{
    let resolver: CommonUpdateAdministrativeAreaLevel2ByIdResolver;
    let handler: CommonUpdateAdministrativeAreaLevel2ByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateAdministrativeAreaLevel2ByIdResolver,
                {
                    provide : CommonUpdateAdministrativeAreaLevel2ByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonUpdateAdministrativeAreaLevel2ByIdResolver>(CommonUpdateAdministrativeAreaLevel2ByIdResolver);
        handler = module.get<CommonUpdateAdministrativeAreaLevel2ByIdHandler>(CommonUpdateAdministrativeAreaLevel2ByIdHandler);
    });

    test('CommonUpdateAdministrativeAreaLevel2ByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateAdministrativeAreaLevel2ByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a administrativeAreaLevel2 by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel2[0])));
            expect(await resolver.main(<CommonUpdateAdministrativeAreaLevel2ByIdInput>administrativeAreasLevel2[0])).toBe(administrativeAreasLevel2[0]);
        });
    });
});