/* eslint-disable indent */
import { IamAccountDto } from '@api/iam/account';
import { IamPermissionDto } from '@api/iam/permission';
import { ApiProperty } from '@nestjs/swagger';

export class IamRoleDto {
  @ApiProperty({
    type: String,
    description: 'id [input here api field description]',
  })
  id: string;

  @ApiProperty({
    type: Number,
    description: 'rowId [input here api field description]',
  })
  rowId: number;

  @ApiProperty({
    type: String,
    description: 'The name of the role',
  })
  name: string;

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
  isMaster: boolean;

  @ApiProperty({
    type: () => [IamPermissionDto],
    description: 'The permissions that belong to the role',
  })
  permissions?: IamPermissionDto[];

  @ApiProperty({
    type: () => [IamAccountDto],
    description: 'The accounts that belong to the role',
  })
  accounts?: IamAccountDto[];

  @ApiProperty({
    type: String,
    description: 'The timestamp when the role was created',
  })
  createdAt?: string;

  @ApiProperty({
    type: String,
    description: 'The timestamp when the role was last updated',
  })
  updatedAt?: string;

  @ApiProperty({
    type: String,
    description: 'The timestamp when the role was deleted',
  })
  deletedAt?: string;
}
