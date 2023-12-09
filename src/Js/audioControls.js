import { useEffect, useRef, useState } from 'react';

const [isPlaying, setIsPlaying] = useState(false);
const [volume, setVolume] = useState(0.5);
const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);
const audioRef = useRef(null);
const [isLoading, setIsLoading] = useState(false);




//functions to handle and control individual tracks
const playNextSong = () => {
    const newIndex = (currentTrackIndex + 1) % playlist.length;
    playTrack(newIndex);
    audioRef.current.pause();
    audioRef.current.src = '';
    setIsLoading(true);
};

useEffect(() => {
    if (currentTrackIndex !== null) {
        if (audioRef.current.src !== playlist[currentTrackIndex].src) {
            const track = playlist[currentTrackIndex];
            audioRef.current.src = track.src;
            audioRef.current.load();
        }
        audioRef.current.play()
            .then(() => {
                setIsPlaying(true);
            })
            .catch((error) => {
                console.error('Error playing audio:', error);
            });
    }
}, [currentTrackIndex, playlist]);


useEffect(() => {
    audioRef.current.addEventListener('ended', playNextSong);
    return () => {
        audioRef.current.removeEventListener('ended', playNextSong);
    };
}, [currentTrackIndex, playlist]);


const togglePlayPause = () => {
    if (currentTrackIndex !== null) {
        if (audioRef.current.paused) {
            const track = playlist[currentTrackIndex];
            audioRef.current.src = track.src;
            audioRef.current.load();
            audioRef.current.currentTime = currentTime; // Set the current time
            audioRef.current.play()
                .then(() => {
                    setIsPlaying(true);
                })
                .catch((error) => {
                    console.error('Error playing audio:', error);
                });
        } else {

            setCurrentTime(audioRef.current.currentTime);
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }
};

const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
};

const updateTime = () => {
    setCurrentTime(audioRef.current.currentTime);
};

useEffect(() => {
    audioRef.current.addEventListener('timeupdate', updateTime);
    audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current.duration);
        setIsLoading(false);
    });
    return () => {
        audioRef.current.removeEventListener('timeupdate', updateTime);
        audioRef.current.removeEventListener('loadedmetadata', () => { });
    };
}, []);

const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const playPreviousTrack = () => {
    if (currentTrackIndex !== null) {
        const newIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        playTrack(newIndex);
        audioRef.current.pause();
        audioRef.current.src = '';
        setIsLoading(true);
    }
};
