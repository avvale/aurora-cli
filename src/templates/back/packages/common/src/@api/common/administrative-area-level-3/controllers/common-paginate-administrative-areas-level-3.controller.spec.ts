import { CommonPaginateAdministrativeAreasLevel3Controller, CommonPaginateAdministrativeAreasLevel3Handler } from '@api/common/administrative-area-level-3';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateAdministrativeAreasLevel3Controller', () =>
{
    let controller: CommonPaginateAdministrativeAreasLevel3Controller;
    let handler: CommonPaginateAdministrativeAreasLevel3Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonPaginateAdministrativeAreasLevel3Controller,
            ],
            providers: [
                {
                    provide : CommonPaginateAdministrativeAreasLevel3Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonPaginateAdministrativeAreasLevel3Controller>(CommonPaginateAdministrativeAreasLevel3Controller);
        handler = module.get<CommonPaginateAdministrativeAreasLevel3Handler>(CommonPaginateAdministrativeAreasLevel3Handler);
    });

    describe('main', () =>
    {
        test('CommonPaginateAdministrativeAreasLevel3Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a commonMockAdministrativeAreaLevel3Data', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : commonMockAdministrativeAreaLevel3Data,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : commonMockAdministrativeAreaLevel3Data,
            });
        });
    });
});
