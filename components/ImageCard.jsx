import React, {useEffect, useState} from 'react';


export default function ImageCard({output,setOutput,outputPrompts}){
    const styles=[{'style':'none','CH':'无背景'},{'style':'circle','CH':'白圈'},{'style':'grid','CH':'四宫格'},{'style':'outline','CH':'彩色轮廓'}]
    const [images,setImages]=useState([]);
    const selectedStyle='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
    const unselectedStyle='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
    

    function fetchImage(imageJSON) {
        // Fetch the image with the input as a query paramete
        console.log(imageJSON)
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
        {
            styles.map(item=>{
                if(item.style===output.style)
                    return (<button className={selectedStyle} key={item.style} onClick={(e)=>{setOutput({...output,'style':item.style})}}>{item.CH}</button>)
                else
                    return (<button className={unselectedStyle} key={item.style} onClick={(e)=>{setOutput({...output,'style':item.style})}}>{item.CH}</button>)
            })
        }
        </div>


        <div className='flex justify-center flex-wrap'>
        {images?
            images.map(image=>image):(<></>)}
        </div>
    </div>);
}

