class Utils {
    //Los métodos de esta clase deben de ser estáticos.
    static debuggin(debugable) {
        debugable.ctx.save();
        debugable.ctx.strokeStyle = "red";
        debugable.ctx.strokeRect(debugable.x, debugable.y, debugable.width, debugable.height);
        debugable.ctx.restore();
    }
}