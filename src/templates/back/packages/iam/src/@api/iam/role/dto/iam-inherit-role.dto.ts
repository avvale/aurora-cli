/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class IamInheritRoleDto {
  @ApiProperty({
    type: String,
    description: 'parentRoleId [input here api field description]',
  })
  parentRoleId: string;

  @ApiProperty({
    type: String,
    description: 'childRoleId [input here api field description]',
  })
  childRoleId: string;
}
