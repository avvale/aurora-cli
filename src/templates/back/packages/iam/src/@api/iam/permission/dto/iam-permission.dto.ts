/* eslint-disable indent */
import { IamBoundedContextDto } from '@api/iam/bounded-context';
import { IamRoleDto } from '@api/iam/role';
import { ApiProperty } from '@nestjs/swagger';

export class IamPermissionDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name: string;

    @ApiProperty({
        type       : String,
        description: 'boundedContextId [input here api field description]',
        example    : '97419405-ebb7-5d5a-83e1-7416a72a28d6',
    })
    boundedContextId: string;

    @ApiProperty({
        type       : () => IamBoundedContextDto,
        description: 'IamBoundedContext [input here api field description]',
    })
    boundedContext?: IamBoundedContextDto;

    @ApiProperty({
        type       : () => [IamRoleDto],
        description: 'roles [input here api field description]',
    })
    roles?: IamRoleDto[];

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
