const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const headingContent = $('.heading-content h3');
const listSong = $('.list-song');
const song = $$('.song');
const replayBtn = $('.replay-btn i');
const prevBtn = $('.prev-btn i');
const playBtn = $('.play-btn');
const pauseBtn = $('.pause-btn');
const nextBtn = $('.next-btn i');
const randomBtn = $('.random-btn i');
const thumb = $('.thumbnail'); 
const thumbImg = $('.thumbnail img'); 
const audioNode = $$('.audio');

const app = {
    currentIndex: 0,
    isRepeat: false,
    isRandom: false,
    prevSong: [],
    randomSong: [],

    songs: [
        {
            name: "Hẹn Gặp Em Dưới Ánh Trăng",
            singer: "HURRYKNG, HIEUTHUHAI, MANBO",
            path: "./assets/songs/hen-gap-em-duoi-anh-trang.mp3",
            image: "https://i.ytimg.com/vi/dLmczwDCEZI/maxresdefault.jpg",
            like: false,
            
        },
        {
            name: "Chỉ Một Đêm Nữa Thôi",
            singer: "MCK & TLinh",
            path: "./assets/songs/chi-mot-dem-nua-thoi.mp3",
            image: "https://i.ytimg.com/vi/GHs_RYQIog8/mqdefault.jpg",
            like: false,
        },
        {
            name: "3 1 0 7",
            singer: "Dương & Nâu",
            path: "./assets/songs/3107.mp3",
            image: "https://i.ytimg.com/vi/V5GS5ANG96M/maxresdefault.jpg",
            like: false,
        },
        {
            name: "Có Người",
            singer: "Vũ Cát Tường",
            path: "./assets/songs/co-nguoi.mp3",
            image: "https://i.ytimg.com/vi/BhbETPFyuaY/maxresdefault.jpg",
            like: false,
        },
        {
            name: "Dù Cho Mai Về Sau",
            singer: "buitruonglinh & Freak D",
            path: "./assets/songs/du-cho-mai-ve-sau.mp3",
            image: "https://i.ytimg.com/vi/Lz8G_Hwc8B8/sddefault.jpg",
            like: false,
        },
        {
            name: "Giá Như",
            singer: "Noo Phước Thịnh",
            path: "./assets/songs/gia-nhu.mp3",
            image: "https://i.ytimg.com/vi/lpOlTa895TQ/sddefault.jpg",
            like: false,
        },
        {
            name: "Ghé Qua",
            singer: "Dick & Tofu & PC",
            path: "./assets/songs/ghe-qua.mp3",
            image: "https://i1.sndcdn.com/artworks-000319063860-5qw7nd-t500x500.jpg",
            like: false,
        },
        {
            name: "Chỉ Là Không Cùng Nhau",
            singer: "Tăng Phúc & Trương Thái Nhi",
            path: "./assets/songs/chi-la-khong-cung-nhau.mp3",
            image: "https://i.ytimg.com/vi/UqKVL56IJB8/maxresdefault.jpg",
            like: false,
        },
        {
            name: "Tất Cả Sẽ Thay Anh",
            singer: "Tăng Phúc",
            path: "./assets/songs/tat-ca-se-thay-anh.mp3",
            image: "https://nhacchuongmoinhat.com/wp-content/uploads/2020/06/T%E1%BA%A5t-C%E1%BA%A3-S%E1%BA%BD-Thay-Anh-%E2%80%93-T%C4%83ng-Ph%C3%BAc.jpg",
            like: false,
        },
        {
            name: "Alaba Trap",
            singer: "Tommy Tèo & MCK",
            path: "./assets/songs/alaba-trap.mp3",
            image: "https://i1.sndcdn.com/artworks-ff7uVbmm3HkUc5qo-wseZkg-t500x500.jpg",
            like: false,
        }
    ],

    render() {
        const htmls = this.songs.map((song, index) => {
            return `<div class="song ${index === this.currentIndex ? 'active' : ''}" data-index = ${index}>
                        <div class="song-thumb">
                            <img alt="song-pic" src="${song.image}"/>
                        </div>
                        <div class="song-content">
                            <h3>${song.name}</h3>
                            <p>${song.singer}</p>
                        </div>
                        <div class="like-btn ${song.like === true ? 'hidden' : ''}">
                            <i class="far fa-heart"></i>
                        </div>
                        <div class="liked-btn ${song.like === false ? 'hidden' : ''}">
                            <i class="fas fa-heart"></i>
                        </div>
                    </div>`
        });
        listSong.innerHTML = htmls.join('');
    },

    defineProperties() {
        Object.defineProperty(this, 'currentSong', {
            get() {
                return this.songs[this.currentIndex];
            }
        });

    },

    eventHandler() {

        const _this = this;
        const thumbWidth = thumbImg.offsetWidth;


        // minimized thumbnail size when scroll down
        document.onscroll = () => {
            const scrollTop = window.scrollY || document.scrollingElement.scrollTop; // || document.documentElement.scrollTop
            const newWidth = thumbWidth - scrollTop;
            thumbImg.style.height = newWidth > 0 ? newWidth + 'px' : 0 ;
            thumbImg.style.width = newWidth > 0 ? newWidth + 'px' : 0;
            thumb.style.height = newWidth > 0 ? newWidth + 'px' : 0;
            thumb.style.opacity = newWidth / thumbWidth;
        }

        //go to next song after ending current song
        audio.onended = () => {
            if(this.isRepeat) {
                audio.play();
            }
            else
                nextBtn.onclick();
        }

        //audio onplay change
        audio.ontimeupdate = () => {
            console.log(1);
        }

        //cycle thumbnail
        const setAnimation = new KeyframeEffect(thumbImg, [{transform: 'rotate(360deg)'}], {duration: 7000, iterations: Infinity}); 
        const thumbAnimation = new Animation(setAnimation);

        //play button
        playBtn.onmousedown = () => {
            playBtn.style.backgroundColor = 'red';
        }
        playBtn.onmouseup = () => {
            playBtn.style.backgroundColor = '#a567a2';
            playBtn.classList.add('hidden');
            pauseBtn.classList.remove('hidden');
            this.loadCurrentSong();
            thumbAnimation.play();
            audio.play();
        }

        //pause button
        pauseBtn.onmousedown = () => {
            pauseBtn.style.backgroundColor = 'red';
        }
        pauseBtn.onmouseup = () => {
            pauseBtn.style.backgroundColor = '#a567a2';
            pauseBtn.classList.add('hidden');
            playBtn.classList.remove('hidden');
            this.loadCurrentSong();
            thumbAnimation.pause();
            audio.pause();
        }

        //next button
        nextBtn.onclick = () => {
            this.loadNextSong();
            playBtn.onmouseup();
            this.render();
        }

        //previous button
        prevBtn.onclick = () => {
            this.loadPrevSong();
            playBtn.onmouseup();
            this.render();
        }

        //repeat button click
        replayBtn.onclick = () => {
            this.isRepeat = !this.isRepeat;
            replayBtn.classList.toggle('active');
        }

        //random button click
        randomBtn.onclick = () => {
            this.isRandom = !this.isRandom;
            randomBtn.classList.toggle('active');
        }

        // click on list song
        listSong.onclick = (e) => {
            let notActiveSong =  e.target.closest('.song:not(.active)');
            let activeSong = e.target.closest('.song.active');
            let likeBtnNode = e.target.closest('.like-btn');
            let likedBtnNode = e.target.closest('.liked-btn');
            if(likeBtnNode && activeSong || likedBtnNode && activeSong) {
                this.currentSong.like = !this.currentSong.like;
                console.log(this.currentSong.like);
            }
            else if(notActiveSong) {
                this.currentIndex = Number(notActiveSong.dataset.index);
                this.loadCurrentSong();
                playBtn.onmouseup();
            }
            this.render();
        }

    },

    //load current song
    loadCurrentSong() {
        audio.src = this.currentSong.path;
        thumbImg.src = this.currentSong.image;
        headingContent.innerHTML = this.currentSong.name;
        // audio.play();
    },

    //next song
    loadNextSong() {
        this.prevSong.push(this.currentIndex);
        if(this.isRandom) {
            this.loadRandomSong();
        }
        else {
            this.currentIndex++;
            if(this.currentIndex >= this.songs.length) 
                this.currentIndex = 0;
            this.loadCurrentSong();
        }
        
        console.log(this.currentIndex);
    },

    //previous song
    loadPrevSong() {
        if(this.prevSong.length > 0) {
            this.currentIndex = this.prevSong.pop();
            this.randomSong.pop();
        }
        else 
            this.currentIndex = 0;
        this.loadCurrentSong();
    },

    //random song
    loadRandomSong() {
        let newIndex;
        if(this.randomSong.length == this.songs.length - 1)
            this.randomSong = [];
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while(newIndex == this.currentIndex || this.randomSong.includes(newIndex));
        this.randomSong.push(this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    start() {

        this.defineProperties();

        this.render();

        this.eventHandler();

        this.loadCurrentSong();

    }
}

app.start();