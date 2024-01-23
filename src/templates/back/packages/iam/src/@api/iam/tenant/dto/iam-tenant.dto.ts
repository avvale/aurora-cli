/* eslint-disable indent */
import { IamAccountDto } from '@api/iam/account';
import { ApiProperty } from '@nestjs/swagger';

export class IamTenantDto
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
        type       : () => IamTenantDto,
        description: 'IamTenant [input here api field description]',
    })
    parent?: IamTenantDto;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name: string;

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
    isActive: boolean;

    @ApiProperty({
        type       : Object,
        description: 'meta [input here api field description]',
    })
    meta?: any;

    @ApiProperty({
        type       : () => [IamAccountDto],
        description: 'accounts [input here api field description]',
    })
    accounts?: IamAccountDto[];

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
