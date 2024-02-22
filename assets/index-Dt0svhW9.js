import{_ as I}from"./index-DGmxUNP7.js";const $=s=>(Vue.pushScopeId("data-v-417121a4"),s=s(),Vue.popScopeId(),s),C=["onDragstart"],B=["src"],P=["innerHTML"],L=$(()=>Vue.createElementVNode("div",{class:"text-white text-lg"},"拖出删除",-1)),y="dragging",b="drop-file",N="dragging-item",R=Vue.defineComponent({__name:"draggable",props:{modelValue:{},modelModifiers:{}},emits:["update:modelValue"],setup(s){const u=Vue.useModel(s,"modelValue"),r=Vue.ref(),i=t=>{t.preventDefault(),r.value.classList.add(b)},c=t=>{t.preventDefault(),t.stopPropagation(),r.value.classList.remove(b)},a=t=>{t.filter(n=>n.type.startsWith("image/")).forEach(n=>{var k;const d=URL.createObjectURL(n),E=new Image;E.src=d;const g={id:_.uniqueId(),name:n.name,url:d,type:n.type};(k=u.value)==null||k.push(g)})},v=t=>{var n;t.preventDefault(),r.value.classList.remove(b);const l=[...((n=t.dataTransfer)==null?void 0:n.files)??[]];a(l)},V=Vue.ref(),p=Vue.ref(),f=t=>{var l;(l=r.value)==null||l.classList.add(y),setTimeout(()=>{t.target&&t.target.classList.add(N)},0),V.value=t.target,m.value=!0},x=t=>{var g;if(t.preventDefault(),t.target===V.value||t.target===p.value.$el||!V.value)return;const l=Array.from(((g=p.value.$el)==null?void 0:g.children)??[]),n=l.indexOf(V.value),d=l.indexOf(t.target);if(!u.value)return;let E=u.value[n];u.value[n]=u.value[d],u.value[d]=E},h=t=>{var l;(l=r.value)==null||l.classList.remove(y),t.target&&t.target.classList.remove(N),m.value=!1},m=Vue.ref(!1),o=Vue.ref(),e=()=>{var t;(t=u.value)==null||t.splice(u.value.findIndex(l=>l===o.value),1)},D=t=>{const l=t.target;a([...l.files??[]]),l.value=""},w=Vue.ref();return(t,l)=>(Vue.openBlock(),Vue.createElementBlock(Vue.Fragment,null,[Vue.createElementVNode("div",{class:"relative z-10 bg-white container flex-shrink-0 w-64 rounded-md h-full border-[2px] transition-all border-cyan-400 overflow-auto",onDrop:v,onDragleave:c,onDragover:i,ref_key:"containerRef",ref:r},[Vue.createVNode(Vue.TransitionGroup,{class:"flex relative flex-col gap-2 p-2 w-full mb-9 draggable transition-all",onDragstart:f,onDragenter:x,onDragend:h,ref_key:"labelFileRef",ref:p,name:"list",tag:"div"},{default:Vue.withCtx(()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(u.value,n=>(Vue.openBlock(),Vue.createElementBlock("div",{class:"draggable-item text-nowrap w-full h-14 p-2 rounded-md select-none text-lg bg-slate-100 flex items-center gap-2 cursor-pointer hover:bg-slate-200 active:bg-slate-300 hover:scale-[1.02] transition-all",onClick:l[0]||(l[0]=d=>{d.stopPropagation(),d.preventDefault()}),draggable:"true",onDragstart:d=>o.value=n,key:n.id},[Vue.createElementVNode("img",{src:n.url,class:"aspect-square h-full rounded-md pointer-events-none",draggable:"false",alt:""},null,8,B),Vue.createElementVNode("div",{class:"text-ellipsis overflow-hidden pointer-events-none",draggable:"false",innerHTML:n.name},null,8,P)],40,C))),128))]),_:1},512),Vue.createVNode(Vue.unref(ElementPlus.ElButton),{class:"upload-btn",type:"success",onClick:l[1]||(l[1]=n=>{var d;return(d=w.value)==null?void 0:d.click()})},{default:Vue.withCtx(()=>[Vue.createTextVNode(" 点击上传 ")]),_:1}),Vue.createElementVNode("input",{class:"hidden",type:"file",accept:".jpg,.jpeg,.png,.gif,.svg",multiple:!0,onChange:D,ref_key:"fileInputRef",ref:w,name:"file"},null,544)],544),Vue.withDirectives(Vue.createElementVNode("div",{class:"mask flex flex-col items-center gap-4 justify-center",onDragover:l[2]||(l[2]=n=>n.preventDefault()),onDrop:e},[Vue.createVNode(Vue.unref(ElementPlus.ElIcon),{size:"36",color:"white"},{default:Vue.withCtx(()=>[Vue.createVNode(Vue.unref(ElementPlusIconsVue.Delete))]),_:1}),L],544),[[Vue.vShow,m.value]])],64))}}),S=I(R,[["__scopeId","data-v-417121a4"]]),T=["src"],U=Vue.defineComponent({__name:"AutoImgs",props:{src:{},style:{}},setup(s){const{src:u,style:r}=s,i=Vue.ref(),c=Vue.ref();return Vue.onMounted(()=>{const a=new Image;a.onload=function(){c.value=`${a.width}/${a.height}`,a.remove()},a.src=u}),Vue.onUpdated(()=>{const a=new Image;a.onload=function(){c.value=`${a.width}/${a.height}`,a.remove()},a.src=u}),(a,v)=>(Vue.openBlock(),Vue.createElementBlock("img",Vue.mergeProps({src:a.src,style:{aspectRatio:c.value,...a.style}},a.$attrs,{ref_key:"imgRef",ref:i}),null,16,T))}}),z=s=>(Vue.pushScopeId("data-v-3b016002"),s=s(),Vue.popScopeId(),s),F={key:0,class:"border-[2px] border-cyan-400 p-2 rounded-md h-full flex-1 w-0 flex flex-col gap-4"},G={class:"flex items-center justify-between"},O={class:"flex items-center gap-2 flex-wrap"},M={key:1,class:"border-[2px] border-cyan-400 pb-2 flex-1 rounded-md flex flex-col gap-2 items-center justify-center"},j=z(()=>Vue.createElementVNode("div",{class:"text-gray-500 text-xs"},"暂未上传任何图像",-1)),A=Vue.defineComponent({__name:"spriteImgs",props:{data:{}},setup(s){const u=Vue.ref(0),r=Vue.ref(300),i=Vue.ref(0),c=Vue.ref(3),a=Vue.ref(.5),v=[{value:.5,label:"x0.5"},{value:1,label:"x1"},{value:2,label:"x2"},{value:4,label:"x4"},{value:8,label:"x8"}],V=Vue.ref(0),p=[{value:0,label:"横图"},{value:1,label:"竖图"},{value:2,label:"网格"}],f=Vue.ref(),x=()=>{f.value&&html2canvas(f.value.$el,{backgroundColor:"transparent",scale:a.value}).then(m=>{let o=m.toDataURL("image/png"),e=document.createElement("a");e.href=o,e.download="sprites.png",e.click(),e.remove()})},h=Vue.computed(()=>{switch(V.value){case 0:return"flex items-center";case 1:return"flex flex-col items-center";case 2:return""}});return(m,o)=>m.data.length>0?(Vue.openBlock(),Vue.createElementBlock("div",F,[Vue.createElementVNode("div",G,[Vue.createElementVNode("div",O,[Vue.createVNode(Vue.unref(ElementPlus.ElInput),{style:{width:"90px"},modelValue:u.value,"onUpdate:modelValue":o[0]||(o[0]=e=>u.value=e)},{prepend:Vue.withCtx(()=>[Vue.createTextVNode("圆角")]),_:1},8,["modelValue"]),Vue.createVNode(Vue.unref(ElementPlus.ElInput),{style:{width:"130px"},modelValue:r.value,"onUpdate:modelValue":o[1]||(o[1]=e=>r.value=e)},{prepend:Vue.withCtx(()=>[Vue.createTextVNode("maxSize")]),_:1},8,["modelValue"]),Vue.createVNode(Vue.unref(ElementPlus.ElInput),{style:{width:"90px"},modelValue:i.value,"onUpdate:modelValue":o[2]||(o[2]=e=>i.value=e)},{prepend:Vue.withCtx(()=>[Vue.createTextVNode("间距")]),_:1},8,["modelValue"]),Vue.createVNode(Vue.unref(ElementPlus.ElSelect),{style:{width:"80px"},modelValue:a.value,"onUpdate:modelValue":o[3]||(o[3]=e=>a.value=e)},{default:Vue.withCtx(()=>[(Vue.openBlock(),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(v,e=>Vue.createVNode(Vue.unref(ElementPlus.ElOption),{key:e.value,label:e.label,value:e.value},null,8,["label","value"])),64))]),_:1},8,["modelValue"]),Vue.createVNode(Vue.unref(ElementPlus.ElSelect),{style:{width:"80px"},modelValue:V.value,"onUpdate:modelValue":o[4]||(o[4]=e=>V.value=e)},{default:Vue.withCtx(()=>[(Vue.openBlock(),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(p,e=>Vue.createVNode(Vue.unref(ElementPlus.ElOption),{key:e.value,label:e.label,value:e.value},null,8,["label","value"])),64))]),_:1},8,["modelValue"]),V.value===2?(Vue.openBlock(),Vue.createBlock(Vue.unref(ElementPlus.ElInput),{key:0,style:{width:"90px"},modelValue:c.value,"onUpdate:modelValue":o[5]||(o[5]=e=>c.value=e)},{prepend:Vue.withCtx(()=>[Vue.createTextVNode("col")]),_:1},8,["modelValue"])):Vue.createCommentVNode("",!0)]),Vue.createVNode(Vue.unref(ElementPlus.ElButton),{type:"primary",onClick:x},{default:Vue.withCtx(()=>[Vue.createTextVNode("下载")]),_:1})]),Vue.createElementVNode("div",{class:Vue.normalizeClass(`imgs-group-background flex-1 ${h.value} rounded-md overflow-auto`)},[Vue.createVNode(Vue.TransitionGroup,{class:Vue.normalizeClass(`imgs-group-${V.value} bg-transparent`),tag:"div",name:"list",ref_key:"imgsContainer",ref:f,style:Vue.normalizeStyle(`gap: ${i.value}px; --max-size:${r.value}px; --col: ${c.value}`)},{default:Vue.withCtx(()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(m.data,e=>(Vue.openBlock(),Vue.createBlock(U,{class:"transition-all block",key:e.id,src:e.url,style:Vue.normalizeStyle({borderRadius:`${u.value}px`,maxWidth:`${r.value}px`,maxHeight:`${r.value}px`}),draggable:"false"},null,8,["src","style"]))),128))]),_:1},8,["class","style"])],2)])):(Vue.openBlock(),Vue.createElementBlock("div",M,[Vue.createVNode(Vue.unref(ElementPlus.ElIcon),{color:"#6c727f",size:"32"},{default:Vue.withCtx(()=>[Vue.createVNode(Vue.unref(ElementPlusIconsVue.Picture))]),_:1}),j]))}}),H=I(A,[["__scopeId","data-v-3b016002"]]),q=Vue.createElementVNode("div",{class:"text-2xl mb-6"},"雪碧图生成器",-1),W={class:"shadow-2xl border rounded-xl w-full h-full max-w-[1440px] p-4 flex gap-4 overflow-hidden"},K=Vue.defineComponent({__name:"index",setup(s){const u=Vue.reactive([]);return(r,i)=>(Vue.openBlock(),Vue.createElementBlock(Vue.Fragment,null,[q,Vue.createElementVNode("div",W,[Vue.createVNode(S,{modelValue:u,"onUpdate:modelValue":i[0]||(i[0]=c=>u=c)},null,8,["modelValue"]),Vue.createVNode(H,{data:u},null,8,["data"])])],64))}});export{K as default};
