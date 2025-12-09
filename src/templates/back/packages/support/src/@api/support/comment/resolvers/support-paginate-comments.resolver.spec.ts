/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    SupportPaginateCommentsHandler,
    SupportPaginateCommentsResolver,
} from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportPaginateCommentsResolver', () => {
    let resolver: SupportPaginateCommentsResolver;
    let handler: SupportPaginateCommentsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                SupportPaginateCommentsResolver,
                {
                    provide: SupportPaginateCommentsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<SupportPaginateCommentsResolver>(
            SupportPaginateCommentsResolver,
        );
        handler = module.get<SupportPaginateCommentsHandler>(
            SupportPaginateCommentsHandler,
        );
    });

    test('SupportPaginateCommentsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('SupportPaginateCommentsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a supportMockCommentData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: 5,
                            count: 5,
                            rows: supportMockCommentData,
                        }),
                    ),
            );
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows: supportMockCommentData,
            });
        });
    });
});
