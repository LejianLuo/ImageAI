'use client'
import DropImage from "../components/DropImage";
import ProductInput from "../components/ProductInput";
import React, {useEffect, useState} from 'react';

export default function Home() {
  const [output,setOutput]=useState({"text":"","image":""})
  return (
   <div>
      <DropImage setOutput={setOutput} output={output}/>
      <ProductInput setOutput={setOutput} output={output}/>
      <>{console.log(output)}</>
   </div>
  );
}
