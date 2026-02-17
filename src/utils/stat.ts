import { mean, std } from "mathjs";
import { jStat } from "jstat";

export const parse = (s: string) =>
  s.split(",").map(v => parseFloat(v.trim())).filter(v => !isNaN(v));

export const summary = (data: number[]) => ({
  mean: mean(data),
  sd: std(data)
});

export const normalCDF = (x:number,m:number,s:number)=>
  jStat.normal.cdf(x,m,s);

export const binomialPDF = (k:number,n:number,p:number)=>
  jStat.binomial.pdf(k,n,p);

export const poissonPDF = (k:number,l:number)=>
  jStat.poisson.pdf(k,l);

export const tCDF = (x:number,df:number)=>
  jStat.studentt.cdf(x,df);

export const chiCDF = (x:number,df:number)=>
  jStat.chisquare.cdf(x,df);

export const fCDF = (x:number,df1:number,df2:number)=>
  jStat.centralF.cdf(x,df1,df2);

export const correlation = (x:number[],y:number[])=>
  jStat.corrcoeff(x,y);
