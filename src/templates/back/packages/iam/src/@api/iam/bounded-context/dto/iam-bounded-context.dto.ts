/* eslint-disable indent */
import { IamPermissionDto } from '@api/iam/permission';
import { ApiProperty } from '@nestjs/swagger';

export class IamBoundedContextDto {
    @ApiProperty({
        type: String,
        description: 'UUID for bounded context',
    })
    id: string;

    @ApiProperty({
        type: Number,
        description: 'rowId [input here api field description]',
    })
    rowId: number;

    @ApiProperty({
        type: String,
        description: 'Name of the bounded context',
    })
    name: string;

    @ApiProperty({
        type: String,
        description: 'root folder where the bounded context is located',
    })
    root: string;

    @ApiProperty({
        type: Number,
        description: 'Sort order of the bounded context',
    })
    sort?: number;

    @ApiProperty({
        type: Boolean,
        description: 'Indicates if the bounded context is active',
        example: true,
    })
    isActive: boolean;

    @ApiProperty({
        type: () => [IamPermissionDto],
        description: 'List of permissions associated with the bounded context',
    })
    permissions?: IamPermissionDto[];

    @ApiProperty({
        type: String,
        description: 'Timestamp when the bounded context was created',
    })
    createdAt?: string;

    @ApiProperty({
        type: String,
        description: 'Timestamp when the bounded context was last updated',
    })
    updatedAt?: string;

    @ApiProperty({
        type: String,
        description: 'Timestamp when the bounded context was deleted',
    })
    deletedAt?: string;
}
