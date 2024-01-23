/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class IamUpdateTenantByIdDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'parentId [input here api field description]',
        example    : '186fc6f7-0160-5e63-9872-355a648c32d2',
    })
    parentId?: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name?: string;

    @ApiProperty({
        type       : String,
        description: 'code [input here api field description]',
    })
    code?: string;

    @ApiProperty({
        type       : String,
        description: 'logo [input here api field description]',
    })
    logo?: string;

    @ApiProperty({
        type       : Boolean,
        description: 'isActive [input here api field description]',
        example    : true,
    })
    isActive?: boolean;

    @ApiProperty({
        type       : [String],
        description: 'accounts [input here api field description]',
    })
    accountIds?: string[];

}
