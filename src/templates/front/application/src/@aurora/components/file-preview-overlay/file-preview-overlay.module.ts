// angular
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FilePreviewOverlayToolbarComponent } from './file-preview-overlay-toolbar/file-preview-overlay-toolbar.component';
import { FilePreviewOverlayComponent } from './file-preview-overlay.component';

@NgModule({
    imports: [
        MatIconModule,
    ],
    declarations: [
        FilePreviewOverlayComponent,
        FilePreviewOverlayToolbarComponent,
    ],
})
export class FilePreviewOverlayModule {}
