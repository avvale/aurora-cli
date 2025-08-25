/* eslint-disable indent */
import { OAuthClientGrantType } from '@api/graphql';
import { ApiProperty } from '@nestjs/swagger';

export class OAuthCredentialsDto
{
    @ApiProperty({
        enum       : OAuthClientGrantType,
        description: 'grantType [input here api field description]',
        example    : OAuthClientGrantType.CLIENT_CREDENTIALS,
    })
    tokenType: OAuthClientGrantType;

    @ApiProperty({
        type       : String,
        description: 'username [input here api field description]',
        example    : 'fq53q81rk6jlths5j988drzzbxxdi3el0ir22jlppr11mx1utl7ok5tt6unge9nnxm3m3978b16j4hlpppkks6p2pynpgeeqa1urvb1t',
    })
    accessToken: string;

    @ApiProperty({
        type       : String,
        description: 'password [input here api field description]',
        example    : 'fq53q81rk6jlths5j988drzzbxxdi3el0ir22jlppr11mx1utl7ok5tt6unge9nnxm3m3978b16j4hlpppkks6p2pynpgeeqa1urvb1t',
    })
    refreshToken: string;

    @ApiProperty({
        type       : String,
        description: 'expiresIn [input here api field description]',
        example    : '2050-01-01 00:00:00',
    })
    expiresIn: number;
}