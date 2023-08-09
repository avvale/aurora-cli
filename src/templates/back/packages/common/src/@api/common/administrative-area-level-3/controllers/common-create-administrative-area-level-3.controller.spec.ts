import { CommonCreateAdministrativeAreaLevel3Controller, CommonCreateAdministrativeAreaLevel3Handler } from '@api/common/administrative-area-level-3';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAdministrativeAreaLevel3Controller', () =>
{
    let controller: CommonCreateAdministrativeAreaLevel3Controller;
    let handler: CommonCreateAdministrativeAreaLevel3Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonCreateAdministrativeAreaLevel3Controller,
            ],
            providers: [
                {
                    provide : CommonCreateAdministrativeAreaLevel3Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonCreateAdministrativeAreaLevel3Controller>(CommonCreateAdministrativeAreaLevel3Controller);
        handler = module.get<CommonCreateAdministrativeAreaLevel3Handler>(CommonCreateAdministrativeAreaLevel3Handler);
    });

    describe('main', () =>
    {
        test('CommonCreateAdministrativeAreaLevel3Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an administrativeAreaLevel3 created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel3Data[0])));
            expect(
                await controller.main(
                    commonMockAdministrativeAreaLevel3Data[0],
                ),
            )
                .toBe(commonMockAdministrativeAreaLevel3Data[0]);
        });
    });
});
