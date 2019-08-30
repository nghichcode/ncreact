function GetCategory(db, ctg) {
  return db.filter(function(d,i){return d[4]===ctg;})
}

function NcRand(s,e){return (s + Math.floor(Math.random()*e));};
function DiffRand(s,e){
  if (s>e) {console.warn("S>E");return;}
  this.ars=[];this.s=0;this.e=0;

  this.init=function(s,e) {this.s=s;this.e=e;this.reset();for(var i=s;i<e;i++){this.ars.push(i);} };
  this.NcRand=NcRand;
  this.next=function() {
    if (this.ars.length<1) {this.init(this.s,this.e);console.warn("RS",this.ars);}
    var r=this.NcRand(0,this.ars.length);var rv=this.ars[r];this.ars=this.ars.filter(function(v,i){return i!==r;});return rv;
  };
  this.reset=function() {this.ars=[];};
  this.init(s,e);
}

function EnDate(date) {
  var ds=new Date(date).toDateString().split(' ');
  if (ds.length !==4) {return 'unknow';}
  return ds[1]+' '+ds[2]+', '+ds[3];
}

export {GetCategory, DiffRand, EnDate};
