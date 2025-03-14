import { Pipe, PipeTransform } from '@angular/core';
import { MarkdownService } from '@aurora/services';

@Pipe({
    name: 'markdownToHtml',
    pure      : true,
    standalone: true,
})
export class MarkdownToHtmlPipe implements PipeTransform
{
    constructor(
        private markdownService: MarkdownService,
    )
    {}

    transform(value: string): string | Promise<string>
    {
        return this.markdownService.markdownToHtml(value);
    }
}
