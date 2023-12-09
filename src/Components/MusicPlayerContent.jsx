import React, { useState } from 'react'
import LeftVerticalMenu from './LeftVerticalMenu'
import NowPlaying from './NowPlaying'
import TopChart from './TopChart'
import TrackList from './TrackList'

export default function MusicPlayerContent() {
    //useState setup
    const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
    const [currentTrackTitle, setCurrentTrackTitle] = useState('');
    const [currentTrackMovie, setCurrentTrackMovie] = useState('');
    const [currentTrackYear, setCurrentTrackYear] = useState('');
    const [currentTrackImage, setCurrentTrackImage] = useState('/Assets/images/default.jpg');

    //list of tracks
    const playlist = [
        { title: 'Bhediya', movie: 'Bhediya', duration: '4:21', year: '2023', src: 'Assets/audio/audio1.mp3', image: '/Assets/images/Bhediya.jpeg' },
        { title: 'Bhul Bhulaiya Title', movie: 'Bhul Bhulaiya', duration: '3:31', year: '2022', src: 'Assets/audio/audio2.mp3', image: '/Assets/images/BhulBhulaiya.jpeg' },
        { title: 'Dil Meri', movie: 'Genius', duration: '3:51', year: '2018', src: 'Assets/audio/audio3.mp3', image: '/Assets/images/Genius.jpg' },
        { title: 'Teri Galiyan', movie: 'Ek Villain', duration: '5:50', year: '2022', src: 'Assets/audio/audio4.mp3', image: '/Assets/images/Villain.jpeg' },
        { title: 'Lahera Do', movie: '83', duration: '3:37', year: '2021', src: 'Assets/audio/audio5.mp3', image: '/Assets/images/83.jpeg' },
        { title: 'Manike', movie: 'Thank God', duration: '3:17', year: '2022', src: 'Assets/audio/audio6.mp3', image: '/Assets/images/ThankGod.jpeg' },
        { title: 'Bolega', movie: 'Pushpa-The Rise', duration: '3:46', year: '2021', src: 'Assets/audio/audio7.mp3', image: '/Assets/images/Pushpa.jpg' },
        { title: 'Chup Prak', movie: 'Shershah', duration: '3:48', year: '2021', src: 'Assets/audio/audio8.mp3', image: '/Assets/images/Shershah.jpg' },
        { title: 'Teri Zalak Ashrafi', movie: 'Pushpa-The Rise', duration: '3:51', year: '2023', src: 'Assets/audio/audio9.mp3', image: '/Assets/images/Pushpa.jpg' },
        { title: 'Tera Ban Jaunga', movie: 'Kabir Singh', duration: '3:56', year: '2019', src: 'Assets/audio/audio10.mp3', image: '/Assets/images/KabirSingh.jpg' },
        { title: 'Mahi', movie: 'Kesari', duration: '3:44', year: '2019', src: 'Assets/audio/audio11.mp3', image: '/Assets/images/Kesari.jpg' },

    ];

    //function to get song data from playlist
    const playTrack = (index) => {
        setCurrentTrackIndex(index);
        setCurrentTrackTitle(playlist[index].title);
        setCurrentTrackMovie(playlist[index].movie);
        setCurrentTrackYear(playlist[index].year);
        setCurrentTrackImage(playlist[index].image);
    };


    return (
        <div className="music-content">
            <LeftVerticalMenu />
            <TopChart playlist={playlist} playTrack={playTrack} />
            <NowPlaying
                playlist={playlist}
                currentTrackIndex={currentTrackIndex}
                playTrack={playTrack}                    //props declaration in parent component.
                currentTrackTitle={currentTrackTitle}
                currentTrackMovie={currentTrackMovie}
                currentTrackYear={currentTrackYear}
                currentTrackImage={currentTrackImage}
            />
            <TrackList playlist={playlist} playTrack={playTrack} />
        </div>
    )
}
