import {
    SupportFindCommentController,
    SupportFindCommentHandler,
} from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportFindCommentController', () => {
    let controller: SupportFindCommentController;
    let handler: SupportFindCommentHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [SupportFindCommentController],
            providers: [
                {
                    provide: SupportFindCommentHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<SupportFindCommentController>(
            SupportFindCommentController,
        );
        handler = module.get<SupportFindCommentHandler>(
            SupportFindCommentHandler,
        );
    });

    describe('main', () => {
        test('SupportFindCommentController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a comment', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(supportMockCommentData[0]),
                    ),
            );
            expect(await controller.main()).toBe(supportMockCommentData[0]);
        });
    });
});
