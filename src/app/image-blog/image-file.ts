export class ImageFile {
   private _imgFile: File;
   private _imgPreviewUrl: string;

  constructor(imgFile: File, imgPreviewUrl: string) {
    this._imgFile = imgFile;
    this._imgPreviewUrl = imgPreviewUrl;
  }

  get imgFile(): File {
    return this._imgFile;
  }

  set imgFile(value: File) {
    this._imgFile = value;
  }

  get imgPreviewUrl(): string {
    return this._imgPreviewUrl;
  }

  set imgPreviewUrl(value: string) {
    this._imgPreviewUrl = value;
  }
}
