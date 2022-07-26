export class tagFontCell {
    x:number;
    y:number;
    vx:number;
    vy:number;
    color;
    content;
    ctx: any;
    cellWidth:number; //文字宽度
    fontSize:number;
    fontStyle:string;
    canvasDom: any = document.getElementById('tagCanvas');
    constructor(color:string, fontSize:number, content:string, ctx:any) {
        this.content = content;
        this.ctx = ctx;
        //设置随机颜色
        this.color = color || `hsla(${Math.floor(Math.random()*360)},75%,75%)`;
        //设置随机字体大小
        this.fontSize = fontSize || Math.round(Math.random()*10)+30
        this.fontStyle = `${this.fontSize}px 微软雅黑`
        this.ctx.font = this.fontStyle;
        this.cellWidth = this.ctx.measureText(this.content).width
        //设置随机坐标
        let randomX = Math.round(Math.random()*(this.canvasDom.width - this.cellWidth))
        let randomY = Math.round(Math.random()*(this.canvasDom.height - this.fontSize) + this.fontSize)
        console.log(randomY,this.fontSize)
        this.x = randomX;//x坐标
        this.y = randomY;//y坐标
        //设置随机速度
        this.vx = +(Math.random() * 0.5 + 0.5).toFixed(1);
        this.vy = +(Math.random() * 0.5 + 0.5).toFixed(1);
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.font = this.fontStyle;
        this.ctx.fillStyle = this.color;
        this.ctx.fillText(this.content,this.x,this.y);
        this.ctx.fill();
    }
    move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x > this.canvasDom.width - this.cellWidth || this.x < 0) {
            this.vx = -this.vx;
        }
        if (this.y > this.canvasDom.height || this.y < this.fontSize) {
            this.vy = -this.vy;
        }
    }
}
