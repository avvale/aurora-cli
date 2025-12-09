import {
    SupportFindCommentByIdController,
    SupportFindCommentByIdHandler,
} from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportFindCommentByIdController', () => {
    let controller: SupportFindCommentByIdController;
    let handler: SupportFindCommentByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [SupportFindCommentByIdController],
            providers: [
                {
                    provide: SupportFindCommentByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<SupportFindCommentByIdController>(
            SupportFindCommentByIdController,
        );
        handler = module.get<SupportFindCommentByIdHandler>(
            SupportFindCommentByIdHandler,
        );
    });

    describe('main', () => {
        test('SupportFindCommentByIdController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an comment by id', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(supportMockCommentData[0]),
                    ),
            );
            expect(await controller.main(supportMockCommentData[0].id)).toBe(
                supportMockCommentData[0],
            );
        });
    });
});
