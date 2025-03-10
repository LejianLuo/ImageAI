import {useDropzone} from 'react-dropzone';
import React, {useEffect, useState} from 'react';
import imageCompression from 'browser-image-compression';


const thumb = {
  display: 'flex',
  borderRadius: 2,
  justifyContent: "center",
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};




export default function DropImage({output,setOutput}){

  const [files, setFiles] = useState([]);
  const {acceptedFiles,getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
    },
    maxFiles:1,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => {

          let base64=convertToBase64(file);
          console.log(acceptedFiles[0])
          return Object.assign(file, 
              {
                preview: URL.createObjectURL(file),
              }
            )
          }
        ));
    }
  });

  async function convertToBase64(file){
      let jpg =await convertPngToJpeg(file);
      let res = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(jpg);
      fileReader.onload = () => {
        resolve(fileReader.result.substring(23));
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    await res.then(value=>{setOutput({...output,"image":value});}, err=>console.log(err));
  };


  async function convertPngToJpeg(file) {
    const options = {
      fileType: 'image/jpeg',  // force output to JPEG
      useWebWorker: true       // improves performance
    };
  
    try {
      const compressedFile = await imageCompression(file, options);
      console.log(compressedFile)
      return compressedFile;
  
    } catch (error) {
      console.error('Image conversion error:', error);
      throw error;
    }
  }

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />

      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section>
      <div {...getRootProps()} className='m-10'>
        <input {...getInputProps()}/>
        <p  className='text-center'>上传图片</p>
      </div>
      <aside className='flex justify-center'>
        {thumbs}
      </aside>
    </section>
  );
}

