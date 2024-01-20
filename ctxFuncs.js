function removeContent(){ 
   document.querySelector("main").innerHTML = ""
}

function renderContent(content){
    document.querySelector("main").innerHTML = content
}

function addToCtx(ctx,next){
  ctx.removeContent = removeContent
  ctx.renderContent = renderContent
  next()
}

export {addToCtx}