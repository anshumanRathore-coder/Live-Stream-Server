const userMedia=document.getElementById('user-video')
const start=document.getElementById('start-btn')
const state={media:null}

const socket=io();
start.addEventListener('click',()=>{
    const mediaRecorder=new MediaRecorder(state.media,{
        audioBitsPerSecond:128000,
        videoBitsPerSecond:250000,
        framerate:25
    })
    mediaRecorder.ondataavailable=ev=>{
        socket.emit('BinaryStream',ev.data);
    }
    mediaRecorder.start(25)
})

window.addEventListener('load',async()=>{
    const media=await navigator.mediaDevices.getUserMedia({audio:true,video:true});
    state.media=media
    userMedia.srcObject=media
})