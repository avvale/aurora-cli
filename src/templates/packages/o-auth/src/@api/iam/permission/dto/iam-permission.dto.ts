/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { IamRoleDto } from '../../../iam/role/dto/iam-role.dto';
import { IamBoundedContextDto } from '../../../iam/bounded-context/dto/iam-bounded-context.dto';

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
        example    : 'e44a7ba0-63d6-439b-964a-5ee62908ac71',
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