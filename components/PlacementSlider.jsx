import React, {useEffect, useState} from 'react';

export default function PlacementSlider({output,setOutput}){

    function setOutputPosition(sliderVal){
        let out={...output};
        switch (sliderVal.label) {
            case "横向":
              out.position.x=sliderVal.value;
              setOutput(out);
              break;
            case "纵向":
              out.position.y=100-sliderVal.value;
              setOutput(out);
              break;
            case "缩放":
              out.position.scale=sliderVal.value/100;
              setOutput(out);
              break;
          }
    }

    return(
        <div className='flex flex-wrap justify-center m-5'>
            <Slider label="横向" min="左" max="右" getSliderValue={setOutputPosition} startingVal={output.position.x}/>
            <Slider label="纵向" min="下" max="上" getSliderValue={setOutputPosition} startingVal={100-output.position.y}/>
            <Slider label="缩放" min="小" max="大" getSliderValue={setOutputPosition} startingVal={output.position.scale*100}/>
        </div>
    )
}

function Slider({label, min, max, getSliderValue,startingVal}){

    return(
    <div className="relative mb-6 m-4">
        <label htmlFor="labels-range-input" className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -top-4">{label}</label>
        <input id="labels-range-input" type="range" defaultValue={startingVal} min="0" max="100" className="w-48 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" onMouseUp={e=>{getSliderValue({'label':label,"value":e.target.value});}}/>
        <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">{min}</span>
       
        <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">{max}</span>
    </div>);
}