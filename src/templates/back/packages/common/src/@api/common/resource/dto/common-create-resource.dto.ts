/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import { ApiProperty } from '@nestjs/swagger';

export class CommonCreateResourceDto {
  @ApiProperty({
    type: String,
    description:
      'Unique identifier for the resource. UUID v4 format, generated automatically on creation.',
  })
  id: string;

  @ApiProperty({
    type: String,
    description:
      'Unique code identifying the resource type (e.g., &quot;PRODUCT&quot;, &quot;USER_AVATAR&quot;, &quot;ARTICLE_IMAGE&quot;). Used programmatically to reference resource types. Must be unique across all resources. Typically uppercase with underscores.',
  })
  code: string;

  @ApiProperty({
    type: String,
    description:
      'Human-readable name of the resource type (e.g., &quot;Product Images&quot;, &quot;User Avatars&quot;). Displayed in admin interfaces for resource management. Should be descriptive and user-friendly.',
  })
  name: string;

  @ApiProperty({
    type: Boolean,
    description:
      'Indicates if the resource type is currently active and can accept new attachments. TRUE: Resource accepts attachments. FALSE: Resource disabled, no new attachments allowed but existing ones preserved. Used for feature toggles and deprecation.',
  })
  isActive: boolean;

  @ApiProperty({
    type: Boolean,
    description:
      'Indicates if this resource type supports file attachments. TRUE: Attachments can be associated with entities of this type. FALSE: Resource type exists but doesn&#x27;t support attachments. Used for resource classification and validation.',
  })
  hasAttachments: boolean;
}
