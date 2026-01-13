import * as FilePond from 'filepond';
import { create, registerPlugin } from 'filepond';

// Import the plugin code
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';

// Import the styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond-plugin-image-resize/dist/filepond-plugin-image-resize.css';
import 'filepond-plugin-file-encode/dist/filepond-plugin-file-encode.css';



document.addEventListener('DOMContentLoaded', function() {
    // Register any plugins
    FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
    );

    // Create FilePond object
    const inputElement = document.querySelector('input[type="file"]');
    const pond = FilePond.create(inputElement);


    // Add it to the DOM
    document.body.appendChild(pond.element);
});

// Get a file input reference
const input = document.querySelector('input[type="file"]');

// Create a FilePond instance
const pond = create(input);
















FilePond.parse(document.body);
