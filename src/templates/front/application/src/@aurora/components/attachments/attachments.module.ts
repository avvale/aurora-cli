import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ImageInputModule } from '@horus/components/image-input/image-input.module';
import { PipesModule } from '@horus/pipes/pipes.module';
import { AttachmentItemComponent } from './attachment-item/attachment-item.component';
import { AttachmentsComponent } from './attachments/attachments.component';
import { AttachmentsService } from './attachments.service';
import { CropperDialogComponent } from './cropper-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        DragDropModule,
        FormsModule,
        ImageInputModule,
        MatButtonModule,
        MatDialogModule,
        PipesModule,
        ReactiveFormsModule,
    ],
    declarations: [
        AttachmentItemComponent,
        AttachmentsComponent,
        CropperDialogComponent
    ],
    providers: [
        AttachmentsService
    ],
    exports: [
        AttachmentsComponent
    ],
})
export class AttachmentsModule {}
