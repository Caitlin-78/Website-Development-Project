import * as FilePond from 'filepond';

// Import plugins
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';

// Import styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond-plugin-image-resize/dist/filepond-plugin-image-resize.css';
import 'filepond-plugin-file-encode/dist/filepond-plugin-file-encode.css';
import 'filepond-plugin-image-crop/dist/filepond-plugin-image-crop.css';
 

// Register plugins
FilePond.registerPlugin(
FilePondPluginImagePreview,
FilePondPluginImageResize,
FilePondPluginFileEncode,
FilePondPluginImageCrop
);
console.log("FilePond plugins registered");

// Create FilePond object
const inputElement = document.querySelector('input[type="file"]');
const pond = FilePond.create(inputElement);


FilePond.parse(document.body);



