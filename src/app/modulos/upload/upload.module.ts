import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule
  ],
  declarations: [],
  exports :[ FileSelectDirective, FileDropDirective, FormsModule, FileUploadModule]
})
export class UploadModule { }
