import { CommonPaginateAdministrativeAreasLevel2Controller, CommonPaginateAdministrativeAreasLevel2Handler } from '@api/common/administrative-area-level-2';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateAdministrativeAreasLevel2Controller', () =>
{
    let controller: CommonPaginateAdministrativeAreasLevel2Controller;
    let handler: CommonPaginateAdministrativeAreasLevel2Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonPaginateAdministrativeAreasLevel2Controller,
            ],
            providers: [
                {
                    provide : CommonPaginateAdministrativeAreasLevel2Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonPaginateAdministrativeAreasLevel2Controller>(CommonPaginateAdministrativeAreasLevel2Controller);
        handler = module.get<CommonPaginateAdministrativeAreasLevel2Handler>(CommonPaginateAdministrativeAreasLevel2Handler);
    });

    describe('main', () =>
    {
        test('CommonPaginateAdministrativeAreasLevel2Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a commonMockAdministrativeAreaLevel2Data', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : commonMockAdministrativeAreaLevel2Data,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : commonMockAdministrativeAreaLevel2Data,
            });
        });
    });
});
