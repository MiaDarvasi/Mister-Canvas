'use strict'

var gDragShape

function createDragShape(pos, shape) {
    gDragShape = {
        pos,
        shape,
        color: gInputColor,
    }
}

function moveDragShape(dx, dy) {
    gDragShape.pos.x += dx
    gDragShape.pos.y += dy
}

function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {

        ev.preventDefault()
        ev = ev.changedTouches[0]

        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }

    }
    return pos
}

function drawTriangle(x, y) {
    gCtx.beginPath()

    gCtx.moveTo(x, y)
    gCtx.lineTo(x + 30, y + 70)
    gCtx.lineTo(x - 50, y + 50)

    gCtx.closePath()
    gCtx.lineWidth = 1

    gCtx.strokeStyle = gInputColor
    gCtx.stroke()
}

function drawRect(x, y) {
    gCtx.beginPath()
    gCtx.strokeStyle = gInputColor

    gCtx.lineWidth = 1
    gCtx.rect(x, y, 50, 50)
    gCtx.stroke()
}

function drawArc(x, y) {
    gCtx.beginPath()
    gCtx.lineWidth = 1

    gCtx.arc(x, y, 30, 0, Math.PI * 2)
    gCtx.strokeStyle = gInputColor
    gCtx.stroke()
}

function drawPen(x, y) {
    gCtx.beginPath()
    gCtx.lineWidth = 3

    gCtx.arc(x, y, 1, 0, Math.PI * 2)
    gCtx.strokeStyle = gInputColor
    gCtx.stroke()
}

