import React, {useEffect, useState} from 'react';
import ImageCard from './ImageCard';
import BackgroundButton from './BackgroundButton';
import PlacementSlider from './PlacementSlider';

function parseProductInput(input){
    let titles=[];
    let backgrounds=[];
    let combined=[];
    let temp=input.content;
    console.log(input.content)
    while(temp.indexOf('[')!==-1){
        let start=temp.indexOf('[');
        let end=temp.indexOf(']');
        let bg=temp.substring(start+1,end);
        temp=temp.substring(end+1)
        backgrounds.push(bg);
    }
    temp=input.content;
    while(temp.indexOf('（')!==-1){
        let start=temp.indexOf('（');
        console.log(start)
        let end=temp.indexOf('）');
        let title=temp.substring(start+1,end);
        temp=temp.substring(end+1);
        titles.push(title);
    }
    if (titles.length===0){
        while(temp.indexOf('(')!==-1){
            let start=temp.indexOf('(');
            let end=temp.indexOf(')');
            let title=temp.substring(start+1,end);
            temp=temp.substring(end+1);
            titles.push(title);
        }
    }
   
    for(let i =0;i<backgrounds.length;i++){
        combined.push({"title":titles[i], "background":backgrounds[i]});
    }
    return combined;
}



export default function ProductInput({output,setOutput}){
    const [product,setProduct]=useState('');
    const [backgrounds,setBackgrounds]=useState([{"title":"", "background":""}]);
   
    async function analyzeImageRequest(product){
        try{
            let res = await fetch(`https://u565357-af23-8140419c.nmb1.seetacloud.com:8443/search/${product}`);
            let data = await res.json();
            let productImages=parseProductInput(data);
            setBackgrounds(productImages);
            console.log(data);
            console.log(productImages);
        }
        catch(error){
            console.log(error);
        }
    }

    return(<>
        <div className='flex justify-center'>
            <input type='text' className='"w-150 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"' onChange={(e)=>setProduct(e.target.value)} placeholder=""/>
            {product?(<button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={()=>analyzeImageRequest(product)}>分析商品</button>):(<button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' disabled={true}>分析商品</button>)}
        
        </div>
        <PlacementSlider setOutput={setOutput} output={output}/>
        <BackgroundButton backgrounds={backgrounds} setOutput={setOutput} output={output}/>
        <ImageCard output={output} setOutput={setOutput}/>
    </>);
}
