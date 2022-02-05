//DOM SELECTION

const music = document.querySelector('#audio')
const seekBar = document.querySelector('.seek-bar')
const songName = document.querySelector('.music-name')
const artistName = document.querySelector('.artist-name')
const disk = document.querySelector('.disk')
const currentTime = document.querySelector('.current-time')
const musicDuration = document.querySelector('.song-duration')
const playBtn = document.querySelector('.play-btn')
const forwardBtn = document.querySelector('.forward-btn')
const backwardBtn = document.querySelector('.backward-btn')

let currentMusic = 0

//play event

playBtn.addEventListener('click', function(){
    if(playBtn.className.includes('pause')){
        music.play()
    }else{
        music.pause()
    }
    playBtn.classList.toggle('pause')
    disk.classList.toggle('play')
})

//setup music

const setMusic = function(i){
    seekBar.value = 0 //set range slide to value 0
    let song = songs[i]
    currentMusic = i
    music.src = song.path

    songName.innerHTML = song.track
    artistName.innerHTML = song.name
    disk.style.backgroundImage = `url(${song.cover})`

    currentTime.innerHTML = '00:00'
    setTimeout(function(){
        seekBar.max = music.duration
        musicDuration.innerHTML = formatTime(music.duration)
    },300)

}

setMusic(0)

const formatTime = function(time){
    let min = Math.floor(time / 60)
    if(min < 10){
        min = `0${min}`
    }
    let sec = Math.floor(time % 60)
        if(sec < 10){
            sec = `0${sec}`
        }

        return `${min} : ${sec}`
    
}

//seek bar

setInterval(function() {
    seekBar.value = music.currentTime
    currentTime.innerHTML = formatTime(music.currentTime)
    if(Math.floor(music.currentTime) == Math.floor(seekBar.max)){
        forwardBtn.click()
    }
}, 500);

seekBar.addEventListener('change', function(){
    music.currentTime = seekBar.value
})

//back/forward

const playMusic = function (){
    music.play()
    playBtn.classList.remove('pause')
    disk.classList.add('play')
}

forwardBtn.addEventListener('click', function(){
    if(currentMusic >= songs.length - 1){
        currentMusic = 0
    }else{
        currentMusic++
    }
    setMusic(currentMusic)
    playMusic()
})

backwardBtn.addEventListener('click', function(){
    if(currentMusic <= 0){
        currentMusic = songs.length - 1
    }else{
        currentMusic--
    }
    setMusic(currentMusic)
    playMusic()
})