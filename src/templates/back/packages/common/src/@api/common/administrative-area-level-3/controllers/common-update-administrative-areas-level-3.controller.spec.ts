/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonUpdateAdministrativeAreasLevel3Controller } from './common-update-administrative-areas-level-3.controller';
import { CommonUpdateAdministrativeAreasLevel3Handler } from '../handlers/common-update-administrative-areas-level-3.handler';

// sources
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3/infrastructure/mock/common-mock-administrative-area-level-3.data';

describe('CommonUpdateAdministrativeAreasLevel3Controller', () =>
{
    let controller: CommonUpdateAdministrativeAreasLevel3Controller;
    let handler: CommonUpdateAdministrativeAreasLevel3Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonUpdateAdministrativeAreasLevel3Controller,
            ],
            providers: [
                {
                    provide : CommonUpdateAdministrativeAreasLevel3Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpdateAdministrativeAreasLevel3Controller>(CommonUpdateAdministrativeAreasLevel3Controller);
        handler = module.get<CommonUpdateAdministrativeAreasLevel3Handler>(CommonUpdateAdministrativeAreasLevel3Handler);
    });

    describe('main', () =>
    {
        test('CommonUpdateAdministrativeAreasLevel3Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a administrativeAreasLevel3 updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel3Data[0])));
            expect(await controller.main(commonMockAdministrativeAreaLevel3Data[0])).toBe(commonMockAdministrativeAreaLevel3Data[0]);
        });
    });
});