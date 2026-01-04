/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class IamUpdateRolesDto {
    @ApiProperty({
        type: String,
        description: 'id [input here api field description]',
    })
    id?: string;

    @ApiProperty({
        type: String,
        description: 'The name of the role',
    })
    name?: string;

    @ApiProperty({
        type: String,
        description:
            'The default redirection URL for the role, after login will be redirected to this URL',
    })
    defaultRedirection?: string;

    @ApiProperty({
        type: Boolean,
        description: 'Indicates if vertical navigation should be hidden',
        example: true,
    })
    hasHiddenVerticalNavigation?: boolean;

    @ApiProperty({
        type: Boolean,
        description:
            'Indicates if the role is created by default and cannot be deleted',
    })
    isMaster?: boolean;

    @ApiProperty({
        type: [String],
        description: 'The permissions that belong to the role',
    })
    permissionIds?: string[];

    @ApiProperty({
        type: [String],
        description: 'The accounts that belong to the role',
    })
    accountIds?: string[];
}
