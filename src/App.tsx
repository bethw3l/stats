import { useState } from "react";
import Plot from "react-plotly.js";
import * as stat from "./utils/stat";

export default function App() {
  const [tool,setTool]=useState("one");
  const [result,setResult]=useState<string>("");
  const [plot,setPlot]=useState<any>(null);

  const clear=()=>{setResult("");setPlot(null);};

  const renderTool=()=>{

    if(tool==="one") return (
      <div className="section">
        <h2>One Quantitative Variable</h2>
        <input id="data" placeholder="1,2,3,4"/>
        <button className="primary" onClick={()=>{
          clear();
          const data=stat.parse((document.getElementById("data") as HTMLInputElement).value);
          const s=stat.summary(data);
          setResult(`Mean=${Number(s.mean).toFixed(4)} | SD=${Number(s.sd).toFixed(4)}`);
          setPlot({x:data,type:"histogram"});
        }}>Analyze</button>
      </div>
    );

    if(tool==="correlation") return (
      <div className="section">
        <h2>Correlation</h2>
        <input id="x" placeholder="X values"/>
        <input id="y" placeholder="Y values"/>
        <button className="primary" onClick={()=>{
          clear();
          const x=stat.parse((document.getElementById("x") as HTMLInputElement).value);
          const y=stat.parse((document.getElementById("y") as HTMLInputElement).value);
          const r=stat.correlation(x,y);
          setResult(`r=${r.toFixed(4)}`);
          setPlot({x,y,mode:"markers",type:"scatter"});
        }}>Calculate</button>
      </div>
    );

    if(tool==="normal") return (
      <div className="section">
        <h2>Normal Distribution</h2>
        <input id="mean" placeholder="Mean"/>
        <input id="sd" placeholder="SD"/>
        <input id="xval" placeholder="X"/>
        <button className="primary" onClick={()=>{
          clear();
          const m=+((document.getElementById("mean") as HTMLInputElement).value);
          const s=+((document.getElementById("sd") as HTMLInputElement).value);
          const x=+((document.getElementById("xval") as HTMLInputElement).value);
          const p=stat.normalCDF(x,m,s);
          setResult(`P(X ≤ ${x})=${p.toFixed(5)}`);
        }}>Calculate</button>
      </div>
    );

    if(tool==="binomial") return (
      <div className="section">
        <h2>Binomial</h2>
        <input id="n" placeholder="n"/>
        <input id="p" placeholder="p"/>
        <input id="k" placeholder="k"/>
        <button className="primary" onClick={()=>{
          clear();
          const n=+((document.getElementById("n") as HTMLInputElement).value);
          const p=+((document.getElementById("p") as HTMLInputElement).value);
          const k=+((document.getElementById("k") as HTMLInputElement).value);
          const prob=stat.binomialPDF(k,n,p);
          setResult(`Probability=${prob.toFixed(5)}`);
        }}>Calculate</button>
      </div>
    );

    if(tool==="sampling") return (
      <div className="section">
        <h2>Sampling Simulation</h2>
        <input id="pop" placeholder="Population"/>
        <input id="size" placeholder="Sample size"/>
        <input id="iter" placeholder="Iterations"/>
        <button className="primary" onClick={()=>{
          clear();
          const pop=stat.parse((document.getElementById("pop") as HTMLInputElement).value);
          const size=+((document.getElementById("size") as HTMLInputElement).value);
          const iter=+((document.getElementById("iter") as HTMLInputElement).value);
          const means=[];
          for(let i=0;i<iter;i++){
            const sample=[];
            for(let j=0;j<size;j++)
              sample.push(pop[Math.floor(Math.random()*pop.length)]);
            means.push(stat.summary(sample).mean);
          }
          setPlot({x:means,type:"histogram"});
        }}>Simulate</button>
      </div>
    );

    return null;
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Statistics</h2>

        <h3>Data Analysis</h3>
        <button onClick={()=>setTool("one")}>One Variable</button>
        <button onClick={()=>setTool("correlation")}>Correlation</button>

        <h3>Distributions</h3>
        <button onClick={()=>setTool("normal")}>Normal</button>
        <button onClick={()=>setTool("binomial")}>Binomial</button>

        <h3>Simulation</h3>
        <button onClick={()=>setTool("sampling")}>Sampling</button>
      </aside>

      <main className="main">
        {renderTool()}
        {result && <p>{result}</p>}
        {plot && <Plot data={[plot]} layout={{width:800,height:450}} />}
      </main>
    </div>
  );
}
