/* eslint-disable @typescript-eslint/no-unused-vars */
import { SupportUpdateCommentsInput } from '@api/graphql';
import {
    SupportUpdateCommentsHandler,
    SupportUpdateCommentsResolver,
} from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportUpdateCommentsResolver', () => {
    let resolver: SupportUpdateCommentsResolver;
    let handler: SupportUpdateCommentsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                SupportUpdateCommentsResolver,
                {
                    provide: SupportUpdateCommentsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<SupportUpdateCommentsResolver>(
            SupportUpdateCommentsResolver,
        );
        handler = module.get<SupportUpdateCommentsHandler>(
            SupportUpdateCommentsHandler,
        );
    });

    test('SupportUpdateCommentsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('SupportUpdateCommentsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a comments updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(supportMockCommentData[0]),
                    ),
            );
            expect(
                await resolver.main(
                    <SupportUpdateCommentsInput>supportMockCommentData[0],
                ),
            ).toBe(supportMockCommentData[0]);
        });
    });
});
