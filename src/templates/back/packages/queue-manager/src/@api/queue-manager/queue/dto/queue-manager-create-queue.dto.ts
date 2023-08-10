/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class QueueManagerCreateQueueDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'prefix [input here api field description]',
    })
    prefix: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name: string;

}
