'use strict'

var gElCanvas
var gCtx
var gCurrShape = 'pen'

var gDrawMode = false
var gStartPos

var gInputColor

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']



function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    resizeCanvas()
    addEventListeners()
    onSetColor()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')


    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    tempCanvas.width = gElCanvas.width;
    tempCanvas.height = gElCanvas.height;
    tempCtx.drawImage(gElCanvas, 0, 0);

    gElCanvas.width = elContainer.clientWidth
    gElCanvas.height = elContainer.clientHeight

    gCtx.drawImage(tempCanvas, 0, 0);
}

function onSetShape(shape) {
    gCurrShape = shape
    const elShape = document.querySelector('.shapes-container')
    elShape.value = gCurrShape
}

function onDraw(x, y) {
    switch (gCurrShape) {
        case 'triangle':
            drawTriangle(x, y)
            break
        case 'rect':
            drawRect(x, y)
            break
        case 'circle':
            drawArc(x, y)
            break
        case 'pen':
            drawPen(x, y)
            break
    }
}

function onDown(ev) {
    gStartPos = getEvPos(ev)
    gDrawMode = true
}

function onMove(ev) {
    if (!gDrawMode) return

    const pos = getEvPos(ev)
    onDraw(pos.x, pos.y)

    gStartPos = pos
}

function onUp() {
    gDrawMode = false
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

function onClearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function addEventListeners() {
    window.addEventListener('resize', resizeCanvas)
    addSetShapeListener()
    addSetColorListener()
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function addSetShapeListener() {
    const shapesSelect = document.querySelector('.shapes-container')

    shapesSelect.addEventListener('change', function (event) {
        const selectedShape = event.target.value;
        onSetShape(selectedShape)
    })
}

function addSetColorListener() {
    const colorSelect = document.getElementById('clr-input')

    colorSelect.addEventListener('change', function (event) {
        const selectedColor = event.target.value;
        onSetColor(selectedColor)
    })
}

function onSetColor(color = "#ffc0cb") {
    gInputColor = color
    const elColor = document.getElementById('clr-input')
    elColor.value = gInputColor
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = function (event) {
        let elImg = new Image()
        elImg.src = event.target.result
        elImg.onload = () => onImageReady(elImg)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(elImg) {
    const canvasAspectRatio = gElCanvas.width / gElCanvas.height;
    const imageAspectRatio = elImg.width / elImg.height;

    let scale = 1;
    let offsetX = 0;
    let offsetY = 0;

    if (imageAspectRatio >= canvasAspectRatio) {
        scale = gElCanvas.width / elImg.width;
        offsetX = 0;
        offsetY = (gElCanvas.height - elImg.height * scale) / 2;
    } else {
        scale = gElCanvas.height / elImg.height;
        offsetX = (gElCanvas.width - elImg.width * scale) / 2;
        offsetY = 0;
    }

    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    gCtx.drawImage(elImg, offsetX, offsetY, elImg.width * scale, elImg.height * scale);
}

