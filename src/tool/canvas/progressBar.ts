export default class ProgressBar {
    private ctx: any;
    private canvas: any;
    private canvasX: number;
    private canvasY: number;
    private progress: number;
    private steps: number;
    private end: number;
    constructor(dom: any) {
        this.canvas = dom
        this.adaptDPR()
        //找到画布的中心点
        this.canvasX = dom.width / 2;
        this.canvasY = dom.height / 2;
        //进度条是100%，所以要把一圈360度分成100份
        this.progress = Math.PI * 2 / 100;
        //指定初始加载步长
        this.steps = 0;
    }
    adaptDPR() { // 在初始化 canvas 的时候就要调用该方法
        const dpr = window.devicePixelRatio;
        const { width, height } = this.canvas;
        // 重新设置 canvas 自身宽高大小和 css 大小。放大 canvas；css 保持不变，因为我们需要那么多的点
        this.canvas.width = Math.round(width * dpr);
        this.canvas.height = Math.round(height * dpr);
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
        this.ctx = this.canvas.getContext('2d');
        // 直接用 scale 放大整个坐标系，相对来说就是放大了每个绘制操作
        this.ctx.scale(dpr, dpr);
        // 接下来的绘制操作和往常一样，比如画个矩形 ctx2d.strokeRect(x, y, w, h);原来该怎么算就怎么算，该怎么调用还是怎么调用
    }

    DrawShape() {
        let {ctx, canvasX, canvasY, steps, progress} = this
        //环形
        ctx.strokeStyle = '#dddddd';
        ctx.lineWidth = 3;
        ctx.save();
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, 31, 0, Math.PI * 2, false)
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        //进度层
        ctx.strokeStyle = "#7c6ed7";
        ctx.lineWidth = 3;
        ctx.save();
        ctx.beginPath();
        ctx.arc(canvasX,canvasY,31, -Math.PI/2, -Math.PI/2+steps*progress,false);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    Animate() {
        //执行平滑动画
        window.requestAnimationFrame(() => {
            //判断步子最终走多远的边界值，此值可以改
            if (this.steps < 99) {
                //该函数在边界内可以调用
                this.Animate();
            }
        });
        //清空绘制内容
        this.ctx.clearRect(0, 0, this.canvasX, this.canvasY);
        //每次增加的步长，数值越大步子越大跑的越快，数值越小走的越慢
        this.steps = this.steps + 1;
        //调用绘制形状函数，传入参数绘制对象，环形进度步长
        this.DrawShape();
    }
}