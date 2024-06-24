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
        this.attachmentTranslationsService.setMessage('alt', message, this.scope);
    }
    @Input() set cancel(message: string)
    {
        this.attachmentTranslationsService.setMessage('cancel', message, this.scope);
    }
    @Input() set crop(message: string)
    {
        this.attachmentTranslationsService.setMessage('crop', message, this.scope);
    }
    @Input() set placeholder(message: string)
    {
        this.attachmentTranslationsService.setMessage('placeholder', message, this.scope);
    }
    @Input() set selectFamily(message: string)
    {
        this.attachmentTranslationsService.setMessage('selectFamily', message, this.scope);
    }
    @Input() set title(message: string)
    {
        this.attachmentTranslationsService.setMessage('title', message, this.scope);
    }

    constructor(
        private attachmentTranslationsService: AttachmentTranslationsService,
    ) { }
}
