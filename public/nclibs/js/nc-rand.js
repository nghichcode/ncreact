ncRand=function(s,e){return (s + Math.floor(Math.random()*e));};
DiffRand = function(s,e){
  if (s>e) {console.warn("S>E");return;}
  this.ars=[];this.s=0;this.e=0;

  this.init=function(s,e) {this.s=s;this.e=e;this.reset();for(i=s;i<e;i++){this.ars.push(i);} };
  this.ncRand=ncRand;
  this.next=function() {
    if (this.ars.length<1) {this.init(this.s,this.e);console.warn("RS",this.ars);}
    var r=this.ncRand(0,this.ars.length);var rv=this.ars[r];this.ars=this.ars.filter(function(v,i){return i!=r;});return rv;
  };
  this.reset=function() {this.ars=[];};
  this.init(s,e);
}