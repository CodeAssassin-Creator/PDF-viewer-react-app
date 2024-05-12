import {Viewer, Worker} from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { useState } from "react";

const PDF = () => {

  const [pdfFile, setPdfFile] = useState(null);
  const [viewFile, setview] = useState(null);
  const fileType = [
    'application/pdf'
  ];
  const handelChange = e => {
    let selF = e.target.files[0];
    if(selF){
      if(selF && fileType.includes(selF.type)){
        let reader = new FileReader();
        reader.readAsDataURL(selF);
        reader.onload = e => {
          setPdfFile(e.target.result);
        }
      }else{
        setPdfFile(null);
      }
    }
  }

  const handelSubmit = e => {
    e.preventDefault();
    setview(pdfFile);
  }
  const newplugin = defaultLayoutPlugin();
  return (
    <div>
      <form onSubmit={handelSubmit}>
        <input type='file' onChange={handelChange}/>
        <button type='submit'>View PDF</button>
      </form>
      <h2>View PDF</h2>
      <div>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            {viewFile && <>
                <Viewer fileUrl={viewFile} plugins={[newplugin]}/>
            </>}
        {!viewFile && <>No PDF</>}
</Worker>
      </div>
    </div>
  )
}

export default PDF