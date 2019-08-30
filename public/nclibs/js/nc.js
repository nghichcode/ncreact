var IMG_PATH = [
  'slider-1-1200x900.jpg',
  'recent-news-1-600x450.jpg',
  'slider-2-450x600.jpg',
  'slider-3-450x600.jpg',
  'crypto-news-1-600x450.jpg',
  'crypto-news-2-600x450.jpg',
  'crypto-news-4-600x450.jpg',
  'crypto-news-5-600x450.jpg',
  'crypto-news-6-600x450.jpg',
  'adult.jpg',
  'default-thumb-1.jpg',
  'default-thumb-2.jpg',
  'default-thumb-3.jpg'
  ];
showProgressBar(90);
// Load
function ucFirst(st) {
  return st.charAt(0).toUpperCase() + st.slice(1);
}
function CreateSinglePage(pdt,page){
  showProgressBar(90);
  var psts=getCtg(pdt);

  $("#recent-post").hide();$("#nav-menu").show();$("#nav-menu").empty();$("#single-pp").empty();
  var tpltMenu=''+
  '<div class="brdr-ash-1 mb-30"></div>'+
  '<div class="container">'+
    '<a class="lnk-default mt-10" href="index.html">'+
      '<i class="fas fa-home"></i> Home <i class="ml-1 fas fa-chevron-right"></i>'+
    '</a>'+
    '<a class="lnk-default mt-10 color-ash" href="#'+pdt+'"> '+ucFirst(pdt)+' Archive</a>'+
  '</div>';
  $("#nav-menu").append(tpltMenu);

  var tplt='<h4 class="p-title"><b>POPULAR POSTS</b></h4><div id="r-page" class="row"></div>';
  $("#single-pp").append(tplt);

  var dfi = new DiffRand(0,IMG_PATH.length);
  page=page?parseInt(page):0;
  const NUM_POSTS=10;

  for (var id=page*NUM_POSTS; id < ((page+1)*NUM_POSTS>=psts.length?psts.length:(page+1)*NUM_POSTS); id++) {
    var url=psts[id][4]+'/'+psts[id][5]+'/'+id;
    tplt=''+
    '<div class="col-sm-6">'+
      '<img src="./wp-content/img/'+IMG_PATH[dfi.next()]+'" alt="nc page img">'+
      '<a class="dplay-block pt-10 h5 bl-yl-link" href="#'+url+'">'+psts[id][0]+'</a>'+
      '<small class="dplay-block color-lite-black mb-30">'+
        'by <a href="'+psts[id][1]+'.html" class="bl-yl-link"><b>'+psts[id][1]+',</b></a> Jan 25, 2018'+
      '</small>'+
    '</div>';
    $("#r-page").append(tplt);
  }
  var url=pdt+'/'+page;
  tplt=''+
    '<div class="dplay-block mb-md-50 mt-20 text-center">'+
      '<a class="btn btn-outline-warning mr-20" href="#'+pdt+'/'+(page-1)+'"><b>PREVIOUS PAGE</b></a>'+
      '<a class="btn btn-outline-warning" href="#'+pdt+'/'+(page+1)+'"><b>NEXT PAGE</b></a>'+
    '</div>';
  $("#single-pp").append(tplt);
  showProgressBar(100);
}
function CreateSinglePost(pdt){
  showProgressBar(90);
  var pst=getCtg(pdt[0]);id=pdt.pop();
  var url="./data/"+pdt.join('/')+".xml";
  var tplt=''+
  '<div class="sgl-header">'+
    '<div class="ctg-entry"><a href="#'+pst[id][4]+'" rel="category tag">'+pst[id][4].toUpperCase()+'</a></div>'+
    '<h1 class="mt-0 mb-1" style="font-family:serif;">'+pst[id][0]+'</h1>'+
    '<div class="entry-meta">'+
      '<small class="c-lblack">by <a href="'+pst[id][1]+'.html" class="bl-yl-link"><b>'+pst[id][1]+',</b></a> '+enDate(pst[id][2])+'</small>'+
    '</div>'+
  '</div>'+
  '<div class="my-3"><img src="./wp-content/img/'+IMG_PATH[ncRand(0,IMG_PATH.length)]+'" class="wp-image" alt="nc image"></div>'+
  '<div class="mt-3"><br/></div>';

  $.ajax({
    url:url,
    error:function(xhr){console.log(xhr.statusText);},
    success:function(result){
      $("#single-pp").empty();
      $("#single-pp").append(tplt);
      $("#single-pp").append(result.getElementsByTagName("nc-content")[0].textContent);
      showProgressBar(100);
    }
  });
}
function loadPage() {
  $("#recent-post").show();$("#nav-menu").hide();
  if (window.location.hash != "") { // Load single/page
    $("#single-pp").show();$("#home-page").hide();
    var pdt=window.location.hash.replace("#","").split('/');
    if (pdt.length==1) {CreateSinglePage(pdt[0]);}
    else if (pdt.length==2) {CreateSinglePage(pdt[0],pdt[1]);}
    else if (pdt.length==3) {CreateSinglePost(pdt);}
    return ;
  };
  // Load index page
  $("#single-pp").hide();$("#home-page").show();
  showProgressBar(100);
}

// Create
function getCtg(ctg) {
  return db.filter(function(d,i){return d[4]==ctg;})
}
function enDate(date) {
  var ds=new Date(date).toDateString().split(' ');
  if (ds.length !=4) {return 'unknow';}
  return ds[1]+' '+ds[2]+', '+ds[3];
}
function createPosts(n) {
  $("#posts-bg").empty();$("#posts-sm").empty();
  var posts = getCtg('posts');
  var df = new DiffRand(0,posts.length);
  var dfi = new DiffRand(0,IMG_PATH.length);

  var id=df.next();
  var url=posts[id][4]+'/'+posts[id][5];
  var postsBg='<img src="./wp-content/img/'+IMG_PATH[dfi.next()]+'" alt="nghichcode posts bg">'+
    '<a href="#'+url+'" class="h4 dplay-block pt-10 bl-yl-link"><b>'+posts[id][0]+'</b></a>'+
    '<small class="dplay-block c-lblack pt-10 pt-sm-0 pb-5">'+
      'by <a href="'+posts[id][1]+'.html" class="bl-yl-link"><b>'+posts[id][1]+',</b></a> '+enDate(posts[id][2])+
    '</small>'+
    '<p class="dplay-block c-lblack pt-10 pt-sm-0">'+posts[id][7]+'</p>';
  $("#posts-bg").append(postsBg);
  
  for (var i = 0; i < n; i++) {
    var id=df.next();
    var url=posts[id][4]+'/'+posts[id][5]+'/'+id;
    var tplt='<div class="oflow-hidden pos-relative mb-20 dplay-block">'+
      '<div class="wh-100x abs-tlr">'+
        '<img class="thumb-border-fh" src="./wp-content/img/'+IMG_PATH[dfi.next()]+'" alt="nghichcode posts-sm">'+
      '</div>'+
      '<div class="ml-120 min-h-100x">'+
        '<a href="#'+url+'" class="h5 bl-yl-link"><b>'+posts[id][0]+'</b></a>'+
        '<small class="dplay-block c-lblack pt-10">'+
          'by <a href="'+posts[id][1]+'.html" class="bl-yl-link"><b>'+posts[id][1]+',</b></a> '+enDate(posts[id][2])+
        '</small>'+
      '</div>'+
    '</div>';

    $("#posts-sm").append(tplt);
  }
}
function createPostsMin(n) {
  $("#posts-min").empty();
  var posts = getCtg('posts');
  var df = new DiffRand(0,posts.length);
  var dfi = new DiffRand(0,IMG_PATH.length);

  for (var i = 0; i < n; i++) {
    var id=df.next();
    var url=posts[id][4]+'/'+posts[id][5];
    var tplt='<div class="mtb-20">'+
        '<a class="color-white" href="#'+url+'"><b>'+posts[id][0]+'</b></a>'+
        '<small class="dplay-block">'+enDate(posts[id][2])+'</small>'+
      '</div>'+
      '<div class="brdr-ash-1 opacty-2"></div>';
    $("#posts-min").append(tplt);
  }
}
function createTuts(n) {
  $("#tuts").empty();
  var tuts = getCtg('tuts');
  var df = new DiffRand(0,tuts.length);
  var dfi = new DiffRand(0,IMG_PATH.length);
  for (var i = 0; i < n; i++) {
    var id=df.next();
    var url=tuts[id][4]+'/'+tuts[id][5];
    var tplt='<div class="col-sm-6">'+
      '<div class="img-sm"><img class="wh-100" src="./wp-content/img/'+IMG_PATH[dfi.next()]+'" alt="nghichcode tuts"></div>'+
      '<a class="dplay-block pt-10 h5 bl-yl-link" href="#'+url+'"><b>'+tuts[id][0]+'</b></a>'+
      '<small class="dplay-block c-lblack mb-30">'+
        'by <a href="'+tuts[id][1]+'.html" class="bl-yl-link"><b>'+tuts[id][1]+',</b></a> '+enDate(tuts[id][2])+
      '</small>'+
    '</div>';
    // $(tplt).insertAfter("#tuts");
    $("#tuts").append(tplt);
  }
}
function createProducts(n) {
  $("#products").empty();var products = getCtg('products');
  var df = new DiffRand(0,products.length);
  var dfi = new DiffRand(0,IMG_PATH.length);
  for (var i = 0; i < n; i++) {
    var id=df.next();
    var url=products[id][4]+'/'+products[id][5];
    var tplt='<div class="oflow-hidden pos-relative mb-20 dplay-block">'+
      '<div class="wh-100x abs-tlr">'+
        '<img class="thumb-border-fh" src="./wp-content/img/'+IMG_PATH[dfi.next()]+'" alt="nghichcode tuts">'+
      '</div>'+
      '<div class="ml-120 min-h-100x">'+
        '<a href="#'+url+'" class="dplay-block h6 bl-yl-link"><b>'+products[id][0]+'</b></a>'+
        '<small class="dplay-block c-lblack">'+
          'by <a href="'+products[id][1]+'.html" class="bl-yl-link"><b>'+products[id][1]+',</b></a> '+enDate(products[id][2])+
        '</small>'+
      '</div>'+
    '</div>';
    $("#products").append(tplt);
  }
}

function createRecentPostBt() {
  var posts = getCtg('posts');
  var df = new DiffRand(0,posts.length);
  var dfi = new DiffRand(0,IMG_PATH.length);
  var tplt='<div class="h-sm-auto oflow-hidden h-200x-fl dp-sm-bl" id="recent-post-bt">\n';
  for (var i = 0; i < 3; i++) {
    var id=df.next();
    var url=posts[id][4]+'/'+posts[id][5];
    tplt=tplt+
    '<div class="col-md-4 col-sm-12 float-left float-sm-none pos-relative ptb-5 pl-sm-0 h-100 h-sm-300x pr-5 pl-0 ">'+
      '<div class="pos-relative h-100 dplay-block">'+
        '<div class="img-bg"><img src="./wp-content/img/'+IMG_PATH[dfi.next()]+'"/></div>'+
        '<div class="abs-blr bg-opac-6">'+
          '<a class="h6" href="'+posts[id][1]+'.html"><b>'+posts[id][1]+'</b></a><br/>'+
          '<span>'+enDate(posts[id][2])+'</span>'+
        '</div>'+
      '</div>';
    '</div>\n';
  }
  tplt+='</div>';
  console.log(tplt);
  $("#recent-post").append(tplt);
}
function createRecentPost() {
  createRecentPostBt();
}

$(document).ready(function(){
  window.addEventListener('popstate', function(){loadPage();});
  // createRecentPost();
  createProducts(10);
  createPostsMin(2);
  createPosts(4);
  createTuts(6);
  loadPage();
});