/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonFindAdministrativeAreaLevel3Controller } from './common-find-administrative-area-level-3.controller';
import { CommonFindAdministrativeAreaLevel3Handler } from '../handlers/common-find-administrative-area-level-3.handler';

// sources
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

describe('CommonFindAdministrativeAreaLevel3Controller', () =>
{
    let controller: CommonFindAdministrativeAreaLevel3Controller;
    let handler: CommonFindAdministrativeAreaLevel3Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonFindAdministrativeAreaLevel3Controller,
            ],
            providers: [
                {
                    provide : CommonFindAdministrativeAreaLevel3Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonFindAdministrativeAreaLevel3Controller>(CommonFindAdministrativeAreaLevel3Controller);
        handler = module.get<CommonFindAdministrativeAreaLevel3Handler>(CommonFindAdministrativeAreaLevel3Handler);
    });

    describe('main', () =>
    {
        test('CommonFindAdministrativeAreaLevel3Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a administrativeAreaLevel3', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel3[0])));
            expect(await controller.main()).toBe(administrativeAreasLevel3[0]);
        });
    });
});