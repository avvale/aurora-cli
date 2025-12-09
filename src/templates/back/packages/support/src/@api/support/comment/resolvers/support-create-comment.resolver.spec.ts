/* eslint-disable @typescript-eslint/no-unused-vars */
import { SupportCreateCommentInput } from '@api/graphql';
import {
    SupportCreateCommentHandler,
    SupportCreateCommentResolver,
} from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportCreateCommentResolver', () => {
    let resolver: SupportCreateCommentResolver;
    let handler: SupportCreateCommentHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                SupportCreateCommentResolver,
                {
                    provide: SupportCreateCommentHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<SupportCreateCommentResolver>(
            SupportCreateCommentResolver,
        );
        handler = module.get<SupportCreateCommentHandler>(
            SupportCreateCommentHandler,
        );
    });

    test('SupportCreateCommentResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('SupportCreateCommentResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an comment created', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(supportMockCommentData[0]),
                    ),
            );
            expect(
                await resolver.main(
                    <SupportCreateCommentInput>supportMockCommentData[0],
                ),
            ).toBe(supportMockCommentData[0]);
        });
    });
});
