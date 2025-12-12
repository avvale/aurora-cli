/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class SupportCreateCommentDto {
    @ApiProperty({
        type: String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type: String,
        description: 'parentId [input here api field description]',
        example: '186fc6f7-0160-5e63-9872-355a648c32d2',
    })
    parentId?: string;

    @ApiProperty({
        type: String,
        description: 'externalId [input here api field description]',
    })
    externalId?: string;

    @ApiProperty({
        type: String,
        description: 'externalParentId [input here api field description]',
        example: '93074465-eda9-5551-bf46-a102be35dc28',
    })
    externalParentId?: string;

    @ApiProperty({
        type: String,
        description: 'issueId [input here api field description]',
        example: '4254ce12-a718-5f29-9f8a-805caa638c17',
    })
    issueId?: string;

    @ApiProperty({
        type: String,
        description: 'accountId [input here api field description]',
        example: 'bb311dbd-dd0b-5412-bf15-ca58a8aa48db',
    })
    accountId?: string;

    @ApiProperty({
        type: String,
        description: 'accountUsername [input here api field description]',
    })
    accountUsername?: string;

    @ApiProperty({
        type: String,
        description: 'displayName [input here api field description]',
    })
    displayName?: string;

    @ApiProperty({
        type: String,
        description: 'description [input here api field description]',
    })
    description: string;

    @ApiProperty({
        type: Object,
        description: 'attachments [input here api field description]',
    })
    attachments?: any;

    @ApiProperty({
        type: Object,
        description: 'screenRecording [input here api field description]',
    })
    screenRecording?: any;

    @ApiProperty({
        type: Object,
        description: 'meta [input here api field description]',
    })
    meta?: any;
}
