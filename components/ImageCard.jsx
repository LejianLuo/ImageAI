import React, {useEffect, useState} from 'react';


export default function ImageCard({output,setOutput,outputPrompts}){
    const [images,setImages]=useState([]);

    function fetchImage(imageJSON) {
        // Fetch the image with the input as a query paramete
        fetch(`https://u565357-af23-8140419c.nmb1.seetacloud.com:8443/post-image`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(imageJSON)
          })
            .then(response => {
                if (!response.ok) throw new Error('Image not found');
                console.log(response)
                return response.blob();
     
            })
            .then(blob => {
                // Create an image element and set its source to the fetched blob
                let src = URL.createObjectURL(blob);
                setImages(images=>[...images, (<img key={src} src={src} className='w-64 h-64'/>)]);
   
                
            })
            .catch(error => console.error('Error:', error));
    }
    function fetchImages(){
        for(let pt in outputPrompts){
            let out={...output};
            out.text=outputPrompts[pt];
            fetchImage(out);
        }   
    }
    return(<div>
        <div className='flex justify-center m-5'>
            <button onClick={fetchImages} className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' >生成图片</button>
        </div>
        <div className="flex justify-center m-5">
            <input checked={output.circle} onChange={()=>setOutput({...output,"circle":!output.circle})}id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">商品背景白圈</label>
        </div>
        <div className='flex justify-center flex-wrap'>
        {images?
            images.map(image=>image):(<></>)}
        </div>
    </div>);
}
