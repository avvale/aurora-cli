/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { QueueManagerJobState } from '@api/graphql';

export class QueueManagerJobDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string | number;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name: string;

    @ApiProperty({
        type       : Object,
        description: 'data [input here api field description]',
    })
    data: any;

    @ApiProperty({
        type       : Object,
        description: 'opts [input here api field description]',
    })
    opts: any;

     @ApiProperty({
        type       : Number,
        description: 'progress [input here api field description]',
    })
    progress: number;

    @ApiProperty({
        type       : Number,
        description: 'delay [input here api field description]',
    })
    delay: number;

    @ApiProperty({
        type       : Number,
        description: 'timestamp [input here api field description]',
    })
    timestamp: number;

    @ApiProperty({
        type       : Number,
        description: 'attemptsMade [input here api field description]',
    })
    attemptsMade: number;

    @ApiProperty({
        type       : String,
        description: 'failedReason [input here api field description]',
    })
    failedReason?: string;

    @ApiProperty({
        type       : [String],
        description: 'stacktrace [input here api field description]',
    })
    stacktrace: string[];

    @ApiProperty({
        type       : Object,
        description: 'returnValue [input here api field description]',
    })
    returnvalue?: any;

    @ApiProperty({
        type       : Number,
        description: 'finishedOn [input here api field description]',
    })
    finishedOn?: number;

    @ApiProperty({
        type       : Number,
        description: 'processedOn [input here api field description]',
    })
    processedOn: number;

    @ApiProperty({
        enum       : QueueManagerJobState,
        enumName   : 'QueueManagerJobState',
        description: 'state [input here api field description]',
    })
    state: QueueManagerJobState;
}
