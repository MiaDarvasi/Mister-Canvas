'use strict'

var gDragShape

function createDragShape(pos, shape) {
    gDragShape = {
        pos,
        shape,
        color: gInputColor,
    }
}

function drawTriangle(x, y, m) {
    var diff = m * 2

    gCtx.beginPath()
    gCtx.moveTo(x, y)
    gCtx.lineTo(x + diff + 30, y + diff + 20);
    gCtx.lineTo(x - diff - 30, y + diff + 20);
    gCtx.closePath()

    gCtx.lineWidth = 1
    gCtx.strokeStyle = gInputColor
    gCtx.stroke()
}

function drawRect(x, y, m) {
    const length = m * 2

    gCtx.beginPath()
    gCtx.rect(x, y, length, length)
    gCtx.closePath()

    gCtx.lineWidth = 1
    gCtx.strokeStyle = gInputColor
    gCtx.stroke()
}

function drawArc(x, y ,m) {
    const radius = m * 2

    gCtx.beginPath()
    gCtx.lineWidth = 1

    gCtx.arc(x, y, radius, 0, Math.PI * 2)
    gCtx.strokeStyle = gInputColor
    gCtx.stroke()
}

function drawPen(x, y) {
    gCtx.beginPath();
    gCtx.moveTo(gStartPos.x, gStartPos.y);
    gCtx.lineTo(x, y);
    gCtx.strokeStyle = gInputColor
    gCtx.stroke();
}
