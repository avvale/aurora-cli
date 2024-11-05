import { InjectionToken } from '@angular/core';
import { ImagePreviewDialogConfig } from './image-preview-overlay.types';
import { ImagePreviewDialog } from './image-preview-overlay.types';

export const IMAGE_PREVIEW_DIALOG_DATA = new InjectionToken<ImagePreviewDialog>('FILE_PREVIEW_DIALOG_DATA');

export const DEFAULT_CONFIG: ImagePreviewDialogConfig = {
    hasBackdrop  : true,
    backdropClass: 'dark-backdrop',
    panelClass   : 'tm-file-preview-dialog-panel',
};