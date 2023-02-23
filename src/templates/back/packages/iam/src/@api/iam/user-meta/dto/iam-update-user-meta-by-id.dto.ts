/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class IamUpdateUserMetaByIdDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : Object,
        description: 'data [input here api field description]',
    })
    data: any;

}