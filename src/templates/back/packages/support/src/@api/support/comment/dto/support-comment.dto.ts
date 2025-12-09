/* eslint-disable indent */
import { IamAccountDto } from '@api/iam/account';
import { SupportIssueDto } from '@api/support/issue';
import { ApiProperty } from '@nestjs/swagger';

export class SupportCommentDto {
    @ApiProperty({
        type: String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type: Number,
        description: 'rowId [input here api field description]',
    })
    rowId: number;

    @ApiProperty({
        type: String,
        description: 'externalId [input here api field description]',
    })
    externalId?: string;

    @ApiProperty({
        type: String,
        description: 'issueId [input here api field description]',
        example: '4254ce12-a718-5f29-9f8a-805caa638c17',
    })
    issueId?: string;

    @ApiProperty({
        type: () => SupportIssueDto,
        description: 'SupportIssue [input here api field description]',
    })
    issue?: SupportIssueDto;

    @ApiProperty({
        type: String,
        description: 'accountId [input here api field description]',
        example: 'bb311dbd-dd0b-5412-bf15-ca58a8aa48db',
    })
    accountId?: string;

    @ApiProperty({
        type: () => IamAccountDto,
        description: 'IamAccount [input here api field description]',
    })
    account?: IamAccountDto;

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

    @ApiProperty({
        type: String,
        description: 'createdAt [input here api field description]',
    })
    createdAt?: string;

    @ApiProperty({
        type: String,
        description: 'updatedAt [input here api field description]',
    })
    updatedAt?: string;

    @ApiProperty({
        type: String,
        description: 'deletedAt [input here api field description]',
    })
    deletedAt?: string;
}
