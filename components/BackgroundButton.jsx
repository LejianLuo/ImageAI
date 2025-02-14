import React, {useEffect, useState} from 'react';


export default function BackgroundButton({backgrounds,setOutput,output}){
    const [foreground,setForeground]=useState('a wooden table covers the bottom half of the image, it extends from left to right horizontally. the table is empty.')
    const [background,setBackground]=useState('');
    const foregroundTypes=[{"ch":'木桌','en':'wooden table'},{"ch":'大理石桌','en':'marble table'},{"ch":'办公桌','en':'office table'},{"ch":'木地板','en':'wooden floor tile'},{"ch":'大理石地板','en':'marble floor tile'}]
    const [isSelectedFG, setFGSelection]=useState(foreground)
    const [isSelectedBG, setBGSelection]=useState(background)
    const selectedStyle='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
    const unselectedStyle='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
    
    function setOutputBackground(background){
        setBGSelection(background)
        setBackground(background);
        setOutput({"text":foreground+""+background,"image":output.image});
 
    }
    function setOutputForeground(fg){
        setFGSelection(fg);
        let foregroundPrompt=`a ${fg} covers the bottom half of the image, it extends from left to right horizontally. the table is empty. `
        setForeground(foregroundPrompt);
        setOutput({"text":foregroundPrompt+""+background,"image":output.image});
        
    }

    return(<div>
        <h3 className='m-5 text-center'>前景</h3>
        <div className='flex justify-center'>
        {
            foregroundTypes.map(fg=>{
                if(isSelectedFG.includes(fg.en))
                    return (<button className={selectedStyle} key={fg.ch} onClick={(e)=>{setOutputForeground(fg.en)}}>{fg.ch}</button>)
                else
                    return (<button className={unselectedStyle} key={fg.ch} onClick={(e)=>{setOutputForeground(fg.en)}}>{fg.ch}</button>)
            }
            )
        }
        </div>
        <h3 className='m-5 text-center'>背景</h3>
        <div className='flex justify-center'>
        {
            backgrounds[0].title?
            backgrounds.map(bg=>{
                if(isSelectedBG.includes(bg.background))
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