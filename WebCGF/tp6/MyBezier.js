/**
 * MyBezier
 */
function MyBezier(point1, point2, point3, point4) {
    
    this.p1 = point1;
    this.p2 = point2;
    this.p3 = point3;
    this.p4 = point4;
};

function.prototype.calcPosition = function(t) {

    return ((1-(t*t*t)) * (this.p1[0] + this.p1[1] + this.p1[2]) + 
            ((3*t) * (1-t) * (1-t)) * (this.p2[0] + this.p2[1] + this.p2[2]) +
            ((3*t*t) * (1-t)) * (this.p3[0] + this.p3[1] + this.p3[2]) +
            (t*t*t) * (this.p4[0] + this.p4[1] + this.p4[2])
            );
};