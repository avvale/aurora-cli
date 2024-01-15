/* eslint-disable indent */
import { OAuthApplicationDto } from '@api/o-auth/application';
import { OAuthClientDto } from '@api/o-auth/client';
import { ApiProperty } from '@nestjs/swagger';

export class OAuthApplicationClientDto
{
    @ApiProperty({
        type       : String,
        description: 'applicationId [input here api field description]',
    })
    applicationId: string;

    @ApiProperty({
        type       : () => OAuthApplicationDto,
        description: 'OAuthApplication [input here api field description]',
    })
    application?: OAuthApplicationDto;

    @ApiProperty({
        type       : String,
        description: 'clientId [input here api field description]',
    })
    clientId: string;

    @ApiProperty({
        type       : () => OAuthClientDto,
        description: 'OAuthClient [input here api field description]',
    })
    client?: OAuthClientDto;

}
