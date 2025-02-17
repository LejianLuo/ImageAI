'use client'
import DropImage from "../components/DropImage";
import ProductInput from "../components/ProductInput";
import React, {useEffect, useState} from 'react';
import ImageCard from "@/components/ImageCard";

export default function Home() {
  const [output,setOutput]=useState({"text":"","image":"","position":{"x":30,"y":70,"scale":0.5},"circle":false},)
  const [outputPrompts,setPrompts]=useState([])
  return (
   <div>
      <DropImage setOutput={setOutput} output={output}/>
      <ProductInput setOutput={setOutput} output={output} outputPrompts={outputPrompts} setPrompts={setPrompts}/>
      <ImageCard output={output} setOutput={setOutput} outputPrompts={outputPrompts}/>
   </div>
  );
}
