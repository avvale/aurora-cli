/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonUpdateAdministrativeAreasLevel3Resolver } from './common-update-administrative-areas-level-3.resolver';
import { CommonUpdateAdministrativeAreasLevel3Handler } from '../handlers/common-update-administrative-areas-level-3.handler';
import { CommonUpdateAdministrativeAreasLevel3Input } from '@api/graphql';

// sources
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel3[0])));
            expect(await resolver.main(<CommonUpdateAdministrativeAreasLevel3Input>administrativeAreasLevel3[0])).toBe(administrativeAreasLevel3[0]);
        });
    });
});