/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonFindAdministrativeAreaLevel1Controller } from './common-find-administrative-area-level-1.controller';
import { CommonFindAdministrativeAreaLevel1Handler } from '../handlers/common-find-administrative-area-level-1.handler';

// sources
import { administrativeAreasLevel1 } from '@app/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('CommonFindAdministrativeAreaLevel1Controller', () =>
{
    let controller: CommonFindAdministrativeAreaLevel1Controller;
    let handler: CommonFindAdministrativeAreaLevel1Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonFindAdministrativeAreaLevel1Controller,
            ],
            providers: [
                {
                    provide : CommonFindAdministrativeAreaLevel1Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonFindAdministrativeAreaLevel1Controller>(CommonFindAdministrativeAreaLevel1Controller);
        handler = module.get<CommonFindAdministrativeAreaLevel1Handler>(CommonFindAdministrativeAreaLevel1Handler);
    });

    describe('main', () =>
    {
        test('CommonFindAdministrativeAreaLevel1Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a administrativeAreaLevel1', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel1[0])));
            expect(await controller.main()).toBe(administrativeAreasLevel1[0]);
        });
    });
});