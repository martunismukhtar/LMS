'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
// import Quill from 'quill';
// import ImageResize from 'quill-image-resize';

// Daftarkan modul imageResize ke Quill
// Quill.register('modules/imageResize', ImageResize);

// Load ReactQuill secara dinamis dengan SSR dinonaktifkan
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
  // name: string;
}
const RichEditor = (props: Props) => {
  const [value, setValue] = useState(props.value);
  // Konfigurasi toolbar dan modules
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['image', 'link'],
    ],
    history: {
      delay: 2000,
      maxStack: 50,
      userOnly: true,
    },
    // imageResize: {}, // Modul sudah didaftarkan
  };
  
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const handleChange = (content: string) => {
    setValue(content);
    props.onChange(content);
  };
  
  return (
    <ReactQuill
      modules={modules}
      theme="snow"      
      value={value}
      formats={['header', 'bold', 'italic', 
        'underline', 'list', 'image', 'link',
        'strike', 'blockquote', 
      ]}
      placeholder="Tulis sesuatu..."
      className="text-sm border rounded w-full py-2 px-3 placeholder-opacity-50 text-slate-700 "
      style={{ height: '500px' }}
      onChange={handleChange}
    />
  );
};

export default RichEditor;
