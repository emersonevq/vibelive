export function distance(a: {x:number,y:number}, b: {x:number,y:number}){ const dx=a.x-b.x; const dy=a.y-b.y; return Math.sqrt(dx*dx+dy*dy); }
export function angle(a:{x:number,y:number}, b:{x:number,y:number}){ return Math.atan2(b.y-a.y,b.x-a.x) * 180/Math.PI; }
