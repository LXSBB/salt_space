export default {
    install(app :any){
        //水波纹按钮
        app.directive('showRipple',{
            mounted(el:any,binding:any){
                el.addEventListener('click',(e:any) => {
                    let x = e.clientX - el.getBoundingClientRect().left
                    let y = e.clientY - el.getBoundingClientRect().top
                    //在鼠标位置增加一个span标签
                    let span:any = document.createElement("span")
                    span.style.position = "absolute"
                    span.style.background = binding.value
                    span.style.opacity = 0.8;
                    span.style.borderRadius = '50%'
                    el.append(span)
                    let width = 0
                    let height = 0
                    let opacity = 1
                    let max_length = Math.sqrt(el.offsetWidth * el.offsetWidth + el.offsetHeight * el.offsetHeight) * 2
                    let time:any = setInterval(() => {
                        width += 5
                        height += 5
                        opacity -= 0.01
                        //判断超出最大值时，清除定时，并且删除span
                        if (width < max_length) {
                            span.style.width = width + 'px'
                            span.style.height = height + 'px'
                            span.style.opacity = opacity;
                            span.style.left = x - span.offsetWidth / 2 + 'px'
                            span.style.top = y - span.offsetHeight / 2 + 'px'
                        } else {
                            clearInterval(time)
                            time = null;
                            span.remove()
                        }
                    }, 10)
                })
            }
        })
    }
}