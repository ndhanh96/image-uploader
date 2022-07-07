import React, { FormEventHandler, useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import ImagesUploaded from '../components/ImagesUploaded';

const Upload = () => {
  const [dragIn, setDragIn] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageList, setImageList] = useState<any>([]);

  const sendImageForm = useMutation(
    async (data: FormData) => {
      const response = await fetch('/api/upload-test', {
        method: 'POST',
        body: data,
      });
      if (!response.ok) throw new Error('network error');
      return response.json();
    },
    {
      onSuccess: (data) => {
        setImageList([
          ...imageList,
          {
            originalName: data[0].originalname,
            path: data[0].path,
            fileName: data[0].filename,
          },
        ]);
      },
    }
  );

  return (
    <div className='flex w-full justify-center flex-wrap '>
      <div
        className={`h-72 w-72 my-12 border-4 border-dashed ${
          dragIn ? 'border-yellow-400' : ''
        }`}
      >
        <form
          onDragEnter={(e) => {
            e.preventDefault();
            setDragIn(!dragIn);
            console.log('dragging in');
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragIn(!dragIn);
            console.log('dragging out');
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragIn(false);
            console.log('dropped');
            setSelectedFile(e.dataTransfer.files[0]);
          }}
          onChange={(e) => {
            e.preventDefault();
            const target = e.target as HTMLInputElement;
            setSelectedFile(target.files![0]);
          }}
          onSubmit={(e) => {
            e.preventDefault();
            console.log(selectedFile);
            const data = new FormData();
            data.append('photo', selectedFile!);
            sendImageForm.mutate(data);
          }}
          className='h-full w-full flex flex-col   justify-center'
        >
          {sendImageForm.isLoading ? (
            <div>Uploading Image</div>
          ) : (
            <>
              {sendImageForm.isError ? <div>somthing wrong</div> : null}
              {sendImageForm.isSuccess ? <div>Image Uploaded</div> : null}
              <input
                ref={inputRef}
                className=' w-fit mx-auto flex-wrap text-sm hidden'
                type='file'
                id='photo'
                accept='image/*'
                multiple
              />
              <p className='truncate'>File name is {selectedFile?.name}</p>

              <button
                className='p-2 mx-auto bg-orange-300 rounded-md'
                type='button'
                onClick={() => {
                  inputRef.current!.click();
                  // console.log(inputRef.current.click())
                }}
              >
                choose file
              </button>
              <button
                className='p-2 mx-auto bg-orange-300 rounded-md'
                type='submit'
              >
                Upload
              </button>
            </>
          )}
        </form>
      </div>
      <ul className='w-full'>
        {imageList.map(
          (img: { path: string; originalName: string; fileName: string }) => (
            <ImagesUploaded
              key={img.fileName}
              imageLink={img.path.replace('/public',' asad')}
              imageName={img.originalName}
            />
          )
        )}
      </ul>
    </div>
  );
};

export default Upload;
