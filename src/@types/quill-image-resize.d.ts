declare module 'quill-image-resize' {
  import { Quill } from 'quill';

  interface ImageResizeOptions {
    modules?: {
      [moduleName: string]: string; // Module dapat memiliki berbagai konfigurasi
    };
    overlayStyles?: { [key: string]: string }; // Gaya khusus untuk overlay
    handleStyles?: { [key: string]: string }; // Gaya khusus untuk handle resize
  }

  class ImageResize {
    constructor(quill: Quill, options: ImageResizeOptions);
  }

  export default ImageResize;
}
