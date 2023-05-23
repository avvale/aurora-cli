/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { QueueManagerJobRegistryState, QueueManagerJobState } from '@api/graphql';

export class QueueManagerJobRegistryDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'queueName [input here api field description]',
    })
    queueName: string;

    @ApiProperty({
        type       : QueueManagerJobRegistryState,
        enum       : ['COMPLETED','WAITING','ACTIVE','DELAYED','FAILED','PAUSED'],
        description: 'state [input here api field description]',
        example    : QueueManagerJobState.COMPLETED,
    })
    state: QueueManagerJobRegistryState;

    @ApiProperty({
        type       : String,
        description: 'jobId [input here api field description]',
    })
    jobId: string;

    @ApiProperty({
        type       : String,
        description: 'jobName [input here api field description]',
    })
    jobName?: string;

    @ApiProperty({
        type       : Object,
        description: 'tags [input here api field description]',
    })
    tags?: any;

    @ApiProperty({
        type       : String,
        description: 'createdAt [input here api field description]',
    })
    createdAt?: string;

    @ApiProperty({
        type       : String,
        description: 'updatedAt [input here api field description]',
    })
    updatedAt?: string;

    @ApiProperty({
        type       : String,
        description: 'deletedAt [input here api field description]',
    })
    deletedAt?: string;

}