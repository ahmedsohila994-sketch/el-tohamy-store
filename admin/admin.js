const PIN="2580";
const KEY="el_tohamy_products";
const DEFAULTS={
royal:{id:"royal",name:"Royal Black",price:12500,priceText:"12,500 ج.م",image:"https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1000&q=90",desc:"ساعة فاخرة بتصميم عصري يجمع بين اللون الأسود والتفاصيل المعدنية الراقية.",material:"Stainless Steel",color:"Black",movement:"Quartz",water:"50M",category:"رجالي",badge:"الأكثر مبيعًا",featured:true},
golden:{id:"golden",name:"Golden Elite",price:15900,priceText:"15,900 ج.م",image:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=90",desc:"تصميم فاخر يجمع بين اللمسات الذهبية والتفاصيل الكلاسيكية.",material:"Stainless Steel",color:"Gold",movement:"Quartz",water:"50M",category:"Luxury",badge:"مميز",featured:true},
midnight:{id:"midnight",name:"Midnight Steel",price:10800,priceText:"10,800 ج.م",image:"https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1000&q=90",desc:"ساعة أنيقة بطابع عصري وتصميم معدني داكن.",material:"Stainless Steel",color:"Dark Steel",movement:"Quartz",water:"50M",category:"رجالي",badge:"جديد",featured:true},
prestige:{id:"prestige",name:"Prestige Leather",price:9750,priceText:"9,750 ج.م",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=90",desc:"تصميم كلاسيكي راقٍ مع حزام جلدي أنيق.",material:"Leather",color:"Brown",movement:"Quartz",water:"30M",category:"كلاسيك",badge:"",featured:false}
};
let products={};
const $=id=>document.getElementById(id);
function load(){try{products=JSON.parse(localStorage.getItem(KEY)||"null")||structuredClone(DEFAULTS);products=normalize(products)}catch(e){products=structuredClone(DEFAULTS)}}
function normalize(data){const out={};Object.entries(data||{}).forEach(([id,p])=>out[id]={...p,id:p.id||id,price:Number(p.price)||0,priceText:money(p.price),category:p.category||"رجالي",badge:p.badge||"",featured:!!p.featured});return out}
function persist(){localStorage.setItem(KEY,JSON.stringify(normalize(products)))}
function money(n){return Number(n).toLocaleString("en-US")+" ج.م"}
function render(){
 const keys=Object.keys(products); $("count").textContent=keys.length;$("featuredCount").textContent=keys.filter(k=>products[k].featured).length;
 const q=($("adminSearch")?.value||"").trim().toLowerCase();
 const filtered=keys.filter(k=>{const p=products[k];return !q||`${p.name} ${p.category} ${p.badge}`.toLowerCase().includes(q)});
 $("productList").innerHTML=filtered.length?filtered.map(k=>{const p=products[k];return `<div class="product-row"><img src="${escAttr(p.image)}" alt="${escAttr(p.name)}"><div><h3>${esc(p.name)}</h3><p>${money(p.price)}</p><small>${esc(p.category)}${p.badge?` · ${esc(p.badge)}`:""}${p.featured?" · ★ مميز":""}</small></div><div class="row-actions"><button data-dup="${k}">نسخ</button><button data-edit="${k}">تعديل</button><button class="delete" data-del="${k}">حذف</button></div></div>`}).join(""):`<div class="empty">لا توجد منتجات مطابقة للبحث.</div>`;
 document.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>edit(b.dataset.edit));document.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>del(b.dataset.del));document.querySelectorAll("[data-dup]").forEach(b=>b.onclick=()=>duplicate(b.dataset.dup));
}
function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function escAttr(v){return esc(v)}
function openEditor(p=null){
 $("editor").classList.remove("hidden");$("editorTitle").textContent=p?"تعديل المنتج":"إضافة منتج";
 $("productId").value=p?.id||"";$("name").value=p?.name||"";$("price").value=p?.price||"";$("desc").value=p?.desc||"";$("material").value=p?.material||"";$("color").value=p?.color||"";$("movement").value=p?.movement||"";$("water").value=p?.water||"";$("category").value=p?.category||"رجالي";$("badge").value=p?.badge||"";$("image").value=p?.image||"";$("featured").checked=!!p?.featured;$("imageFile").value="";showPreview(p?.image||"");$("editor").scrollIntoView({behavior:"smooth",block:"start"});
}
function edit(id){openEditor(products[id])}
function duplicate(id){const p=products[id],newId="p_"+Date.now();products[newId]={...p,id:newId,name:p.name+" — نسخة"};persist();render();openEditor(products[newId])}
function del(id){if(!confirm("هل تريد حذف هذا المنتج؟"))return;delete products[id];persist();render()}
$("loginBtn").onclick=()=>{if($("pin").value===PIN){sessionStorage.setItem("el_admin","1");$("login").classList.add("hidden");$("dashboard").classList.remove("hidden");load();render()}else $("loginError").textContent="رمز الدخول غير صحيح."};
$("pin").addEventListener("keydown",e=>{if(e.key==="Enter")$("loginBtn").click()});$("logout").onclick=()=>{sessionStorage.removeItem("el_admin");location.reload()};$("newProduct").onclick=()=>openEditor();$("closeEditor").onclick=$("cancel").onclick=()=>$("editor").classList.add("hidden");
$("reset").onclick=()=>{if(confirm("سيتم حذف تعديلاتك وإرجاع المنتجات الأصلية. هل أنت متأكد؟")){products=structuredClone(DEFAULTS);persist();render()}};
$("adminSearch")?.addEventListener("input",render);$("image").oninput=e=>showPreview(e.target.value);
$("imageFile").onchange=e=>{const f=e.target.files[0];if(!f)return;if(f.size>1.5*1024*1024){alert("الصورة كبيرة جدًا. اختر صورة أقل من 1.5MB.");e.target.value="";return}const r=new FileReader();r.onload=()=>{$("image").value=r.result;showPreview(r.result)};r.readAsDataURL(f)};
function showPreview(src){if(src){$("preview").classList.remove("hidden");$("previewImg").src=src}else $("preview").classList.add("hidden")}
$("productForm").onsubmit=e=>{e.preventDefault();const id=$("productId").value||("p_"+Date.now());const price=Number($("price").value);products[id]={id,name:$("name").value.trim(),price,priceText:money(price),image:$("image").value.trim(),desc:$("desc").value.trim(),material:$("material").value.trim()||"Stainless Steel",color:$("color").value.trim()||"Classic",movement:$("movement").value.trim()||"Quartz",water:$("water").value.trim()||"50M",category:$("category").value||"رجالي",badge:$("badge").value.trim(),featured:$("featured").checked};persist();render();$("editor").classList.add("hidden");alert("تم حفظ المنتج بنجاح ✓")};
if(sessionStorage.getItem("el_admin")==="1"){$("login").classList.add("hidden");$("dashboard").classList.remove("hidden");load();render()}
