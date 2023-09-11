/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class OAuthUpdateApplicationsClientsDto
{
    @ApiProperty({
        type       : String,
        description: 'applicationId [input here api field description]',
    })
    applicationId?: string;

    @ApiProperty({
        type       : String,
        description: 'clientId [input here api field description]',
    })
    clientId?: string;

}
