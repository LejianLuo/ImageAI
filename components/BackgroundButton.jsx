import React, {useEffect, useState} from 'react';


export default function BackgroundButton({backgrounds,outputPrompts,setPrompts}){

    const selectedStyle='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
    const unselectedStyle='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
    
    function setOutputBackground(background){
 
        if(outputPrompts.includes(background)){
            let results=outputPrompts.filter(bg=>bg!==background);
            setPrompts(results);
        }
        else
            setPrompts([...outputPrompts,background]);
        
    }


    return(<div>

        <h3 className='m-5 text-center'>背景</h3>
        <div className='flex justify-center'>
        {
            backgrounds[0].title?
            backgrounds.map(bg=>{
                if(outputPrompts.includes(bg.background))
                    return (<button className={selectedStyle} key={bg.title} onClick={(e)=>{setOutputBackground(bg.background)}}>{bg.title}</button>)
                else
                    return (<button className={unselectedStyle} key={bg.title} onClick={(e)=>{setOutputBackground(bg.background)}}>{bg.title}</button>)
            }
            )
            :
            <h3 className='m-3'>未生成背景</h3>
        }
        </div>
        
    </div>);
}
