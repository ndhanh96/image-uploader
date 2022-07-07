import Link from 'next/link';
import React from 'react';

const ImagesUploaded = ({
  imageLink,
  imageName,
}: {
  imageLink: string;
  imageName: string;
}) => {
  // console.log('link',() => imageLink.replace('/public',' asad'))
  return (
    <div className='w-full'>
      <Link href={imageLink.replace('/public','')}>
        <a>{imageName}</a>
      </Link>
    </div>
  );
};

export default ImagesUploaded;
