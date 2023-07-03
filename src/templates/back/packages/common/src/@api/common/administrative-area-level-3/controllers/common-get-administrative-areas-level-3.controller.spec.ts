/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonGetAdministrativeAreasLevel3Controller } from './common-get-administrative-areas-level-3.controller';
import { CommonGetAdministrativeAreasLevel3Handler } from '../handlers/common-get-administrative-areas-level-3.handler';

// sources
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3/infrastructure/mock/common-mock-administrative-area-level-3.data';

describe('CommonGetAdministrativeAreasLevel3Controller', () =>
{
    let controller: CommonGetAdministrativeAreasLevel3Controller;
    let handler: CommonGetAdministrativeAreasLevel3Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonGetAdministrativeAreasLevel3Controller,
            ],
            providers: [
                {
                    provide : CommonGetAdministrativeAreasLevel3Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonGetAdministrativeAreasLevel3Controller>(CommonGetAdministrativeAreasLevel3Controller);
        handler = module.get<CommonGetAdministrativeAreasLevel3Handler>(CommonGetAdministrativeAreasLevel3Handler);
    });

    describe('main', () =>
    {
        test('CommonGetAdministrativeAreasLevel3Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a commonMockAdministrativeAreaLevel3Data', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel3Data)));
            expect(await controller.main()).toBe(commonMockAdministrativeAreaLevel3Data);
        });
    });
});