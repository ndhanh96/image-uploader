import Uppy from '@uppy/core';
import React from 'react';
import XHRUpload from '@uppy/xhr-upload';
import type { NextPage } from 'next';
import { useUppy, DragDrop, ProgressBar } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import '@uppy/progress-bar/dist/style.css';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();
  // const uppy = useUppy(() => {
  //   return new Uppy({
  //     meta: { type: 'photo' },
  //     debug: true,
  //     autoProceed: true,
  //     restrictions: {
  //       maxNumberOfFiles: 1,
  //       maxFileSize: 1048576 * 4,
  //       allowedFileTypes: ['image/*'],
  //     },
  //   })
  //     .use(XHRUpload, {
  //       endpoint: '/api/upload',
  //       fieldName: 'photo',
  //       formData: true,
  //     })
  //     .on('complete', (result) => {
  //       console.log(result);
  //     })
  //     .on('upload-success', (result) => {
  //       console.log(result);
  //     })
  //     .on('error', (error) => {
  //       console.error(error.stack);
  //     });
  // });
  const uppy = new Uppy({
    meta: { type: 'photo' },
    debug: true,
    autoProceed: true,
    restrictions: {
      maxNumberOfFiles: 1,
      allowedFileTypes: ['image/*'],
    },
  });

  uppy
    .use(XHRUpload, {
      endpoint: '/api/upload',
      fieldName: 'photo',
      formData: true,
    })
    .on('progress', () => {
      console.log('uploading')
      return (<div>Loading</div>)
    })
    .on('upload-success', (file, respone) => {
      console.log(respone.body);
      // router.push(respone.body.picture);
    })
    .on('error', (error) => {
      console.error(error.stack);
    });

  return (
    <div className='flex justify-center items-center w-full h-auto bg-slate-100'>
      <div className='flex flex-col my-10 items-center'>
        <h1 className='text-center'>Image Uploader</h1>
        <DragDrop
          className='w-72 h-auto bg-slate-500'
          note='Images up to whatever'
          // assuming `props.uppy` contains an Uppy instance:
          uppy={uppy}
          locale={{
            strings: {
              // Text to show on the droppable area.
              // `%{browse}` is replaced with a link that opens the system file selection dialog.
              dropHereOr: 'Drop here or %{browse}',
              // Used as the label for the link that opens the system file selection dialog.
              browse: 'browse',
            },
          }}
        />
        <ProgressBar
          className='h-4 w-full relative'
          uppy={uppy}
          fixed
          // hideAfterFinish
        />
      </div>
    </div>
  );
};

export default Home;
