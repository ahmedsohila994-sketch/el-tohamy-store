const DEFAULT_PRODUCTS={
royal:{id:"royal",name:"Royal Black",price:12500,priceText:"12,500 ج.م",image:"https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1000&q=90",desc:"ساعة فاخرة بتصميم عصري يجمع بين اللون الأسود والتفاصيل المعدنية الراقية.",material:"Stainless Steel",color:"Black",movement:"Quartz",water:"50M",category:"رجالي",badge:"الأكثر مبيعًا",featured:true},
golden:{id:"golden",name:"Golden Elite",price:15900,priceText:"15,900 ج.م",image:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=90",desc:"تصميم فاخر يجمع بين اللمسات الذهبية والتفاصيل الكلاسيكية.",material:"Stainless Steel",color:"Gold",movement:"Quartz",water:"50M",category:"Luxury",badge:"مميز",featured:true},
midnight:{id:"midnight",name:"Midnight Steel",price:10800,priceText:"10,800 ج.م",image:"https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1000&q=90",desc:"ساعة أنيقة بطابع عصري وتصميم معدني داكن.",material:"Stainless Steel",color:"Dark Steel",movement:"Quartz",water:"50M",category:"رجالي",badge:"جديد",featured:true},
prestige:{id:"prestige",name:"Prestige Leather",price:9750,priceText:"9,750 ج.م",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=90",desc:"تصميم كلاسيكي راقٍ مع حزام جلدي أنيق.",material:"Leather",color:"Brown",movement:"Quartz",water:"30M",category:"كلاسيك",badge:"",featured:false}
};
const PRODUCT_STORAGE_KEY="el_tohamy_products";
function normalizeProducts(data){
  const out={};
  Object.entries(data||{}).forEach(([id,p])=>{out[id]={...p,id:p.id||id,price:Number(p.price)||0,priceText:(Number(p.price)||0).toLocaleString("en-US")+" ج.م",category:p.category||"رجالي",badge:p.badge||"",featured:!!p.featured}});
  return out;
}
function loadProducts(){
  try{const saved=JSON.parse(localStorage.getItem(PRODUCT_STORAGE_KEY)||"null");return saved&&typeof saved==="object"?normalizeProducts(saved):normalizeProducts(DEFAULT_PRODUCTS)}catch(e){return normalizeProducts(DEFAULT_PRODUCTS)}
}
function saveProducts(products){localStorage.setItem(PRODUCT_STORAGE_KEY,JSON.stringify(normalizeProducts(products)));}
window.PRODUCTS=loadProducts();
window.refreshProducts=()=>{window.PRODUCTS=loadProducts();return window.PRODUCTS;};
