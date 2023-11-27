import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AttachmentTranslationsService } from './attachment-translations.service';

@Component({
    selector       : 'au-attachment-translations',
    template       : '',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
})
export class AttachmentTranslationsComponent
{
    @Input('for') scope: string = 'attachments';

    // messages translations
    @Input() set alt(message: string)
    {
        this.attachmentTranslationsService.setMessage(this.scope, 'alt', message);
    }
    @Input() set cancel(message: string)
    {
        this.attachmentTranslationsService.setMessage(this.scope, 'cancel', message);
    }
    @Input() set crop(message: string)
    {
        this.attachmentTranslationsService.setMessage(this.scope, 'crop', message);
    }
    @Input() set placeholder(message: string)
    {
        this.attachmentTranslationsService.setMessage(this.scope, 'placeholder', message);
    }
    @Input() set selectFamily(message: string)
    {
        this.attachmentTranslationsService.setMessage(this.scope, 'selectFamily', message);
    }
    @Input() set title(message: string)
    {
        this.attachmentTranslationsService.setMessage(this.scope, 'title', message);
    }

    constructor(
        private attachmentTranslationsService: AttachmentTranslationsService,
    ) { }
}
