﻿
const colors = ['#DEF8F1', '#C6F5E9', '#A5F2DD', '#82ECD0', '#60E7C3', '#3DE1B6', '#25DCAB', '#0ED7A2', '#07C996'];

const songs = ['Ukulele', 'Hey', 'Summer', 'Background', 'Rhythm', 'Sample-6s', 'Sample-9s', 'Sample-12s', 'Sample-15s'];

const musicInfo = document.getElementsByClassName('music-info');

const allBtn = document.getElementsByClassName('btn-group');

createAllAudio();

createButtons();

document.querySelectorAll('.switch-input').forEach(item => {

    item.addEventListener('click', event => {
        let id = event.target.id;

        if (id != '') {
            //find the index of the song that needs to mute/unmute
            let tempArr = id.match(/(\d+)/);
            let indexSong = Number(tempArr[0]);

            if (document.getElementById(id).checked) 
                muteSong(indexSong, true);
            else 
                muteSong(indexSong, false);
            
        }
    })
})

function muteSong (index, isChecked) {

    document.getElementById(`audio${index}`).muted = isChecked;
    console.log(`audio${index}`, isChecked);

}

//creating the 9 audio elements
function createAllAudio() {

    for (let i = 0; i < songs.length; i++) {//TODO: try to split to more functions

        const newText = document.createElement('div');

        newText.textContent = songs[i];
        newText.style.backgroundColor = colors[i];
        newText.classList.add('audio-row');
        newText.id=songs[i];

        const newAudio = document.createElement('audio');
        newAudio.id = `audio${i}`;
        newAudio.innerHTML = `<source src='music/${songs[i]}.mp3' type='audio/mpeg'>`;

        newText.appendChild(newAudio);

        const newBtn = document.createElement('label');
        newBtn.classList.add("switch");
        newBtn.onclick = muteBtnPressed;
        newBtn.id = `mute${i}-label`;
        newBtn.innerHTML = `<input type='checkbox' class='switch-input' id='mute${i}'> <span class='slider'></span><span class='labels' data-on='Unmute' data-off='Mute'></span>`;

        newText.appendChild(newBtn);

        musicInfo[0].appendChild(newText);

    }
}


//creating the play, stop and loop buttons
function createButtons() {

    const playBtn = document.createElement('button');
    playBtn.id = "playAll";
    playBtn.innerHTML = "Play";
    playBtn.onclick = playAllSongs;

    const stopBtn = document.createElement('button');
    stopBtn.id = "stopAll";
    stopBtn.innerHTML = "Stop";
    stopBtn.onclick = stopAllSongs;

    const loopBtn = document.createElement('label');
    loopBtn.classList.add("switch");
    loopBtn.id = "loopAll";
    loopBtn.onclick = loopAllSongs;
    loopBtn.innerHTML = "<input type='checkbox'> <span class='slider'></span><span class='labels' data-on='Stop Loop' data-off='Loop'></span>";

    allBtn[0].appendChild(playBtn);
    allBtn[0].appendChild(stopBtn);
    allBtn[0].appendChild(loopBtn);
}

function playAllSongs() {

    for (let i = 0; i < songs.length; i++) {

        let song = document.getElementById(`audio${i}`);
        //if this song is muted by user, do not play it
        if (song.muted === false) {
            song.play();
            //adding cursor to the playing songs
            document.getElementById(songs[i]).style.border = "1px solid #97BCB7";
        }
    }
}

function stopAllSongs() {

    for (let i = 0; i < songs.length; i++) {

        let song = document.getElementById(`audio${i}`);
        song.pause();
        song.currentTime = 0;
        //canceling cursor
        document.getElementById(songs[i]).style.border = "none";
    }
}

function loopAllSongs() {

    //const loopBtn = document.getElementById("loopAll");
    //boolean varible- to update loop fild. defult toggel is off
    //let goLoop = true;

    //if (loopBtn.checked) 
    //    goLoop = false;
  
    for (let i = 0; i < songs.length; i++) {
        if (!document.getElementById(`mute${i}`).checked) {
            console.log(`loop audio${i}`);
            document.getElementById(`audio${i}`).loop = true;
        }
    }
    

     
}

function muteBtnPressed() {


}

//document.getElementById("playAll").addEventListener('click', () => {

//	console.log("in play func");

//	for (let i = 0; i < songs.length; i++) {

//		document.getElementById('audio${i}').play();
//	}
//	console.log("finished play func");

//});