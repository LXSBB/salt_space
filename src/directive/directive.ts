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
                        width += 10
                        height += 10
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
        });
        //彩虹字
        app.directive('rainBow',{
            mounted(el:any,binding:any) {
                let rainbowText = el
                let letters = binding.value.split("");
                letters.forEach((letter:string, i:number) => {
                    let span = document.createElement("span");
                    span.textContent = letter;
                    span.style.animation = 'rainbow 30s alternate infinite forwards'
                    span.style.animationDelay = `${-20 + i * 0.2}s`;
                    rainbowText.append(span);
                });
            }
        })
    }
}