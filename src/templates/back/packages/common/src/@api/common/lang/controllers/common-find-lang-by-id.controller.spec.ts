/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonFindLangByIdController } from './common-find-lang-by-id.controller';
import { CommonFindLangByIdHandler } from '../handlers/common-find-lang-by-id.handler';

// sources
import { commonMockLangData } from '@app/common/lang/infrastructure/mock/common-mock-lang.data';

describe('CommonFindLangByIdController', () =>
{
    let controller: CommonFindLangByIdController;
    let handler: CommonFindLangByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonFindLangByIdController,
            ],
            providers: [
                {
                    provide : CommonFindLangByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonFindLangByIdController>(CommonFindLangByIdController);
        handler = module.get<CommonFindLangByIdHandler>(CommonFindLangByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonFindLangByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an lang by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockLangData[0])));
            expect(await controller.main(commonMockLangData[0].id)).toBe(commonMockLangData[0]);
        });
    });
});