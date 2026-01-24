/* eslint-disable indent */
import { OAuthApplicationDto } from '@api/o-auth/application';
import { OAuthClientDto } from '@api/o-auth/client';
import { ApiProperty } from '@nestjs/swagger';

export class OAuthApplicationClientDto {
  @ApiProperty({
    type: String,
    description: 'applicationId [input here api field description]',
    example: '209e8dce-ce93-5b3d-a4f3-06ce49207393',
  })
  applicationId: string;

  @ApiProperty({
    type: () => OAuthApplicationDto,
    description: 'OAuthApplication [input here api field description]',
  })
  application?: OAuthApplicationDto;

  @ApiProperty({
    type: String,
    description: 'clientId [input here api field description]',
    example: '467dc818-05a8-5053-9ec3-7ae4e2f225c0',
  })
  clientId: string;

  @ApiProperty({
    type: () => OAuthClientDto,
    description: 'OAuthClient [input here api field description]',
  })
  client?: OAuthClientDto;
}
