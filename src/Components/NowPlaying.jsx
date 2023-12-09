import React, { useEffect, useRef, useState } from 'react';

//props recieved from parent MusicPlayerContentComponent
export default function NowPlaying({ playlist, currentTrackIndex,
    playTrack, currentTrackTitle, currentTrackMovie, currentTrackYear,
    currentTrackImage }) {

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

    //now plying secions with music controls(UI) and functions
    return (
        <div className="track-controls">
            <div className="section-title">
                <span>{currentTrackTitle}</span>
            </div>
            <div className="track-image">
                <img src={currentTrackImage} alt="song-image" />
            </div>
            <div className="track-details">
                <div className="plus-icon">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.875 8.375H10.125V1.625C10.125 1.32663 10.0065 1.04048 9.7955 0.829505C9.58452 0.618527 9.29837 0.5 9 0.5C8.70163 0.5 8.41548 0.618527 8.2045 0.829505C7.99353 1.04048 7.875 1.32663 7.875 1.625V8.375H1.125C0.826631 8.375 0.540484 8.49353 0.329505 8.7045C0.118527 8.91548 0 9.20163 0 9.5C0 9.79837 0.118527 10.0845 0.329505 10.2955C0.540484 10.5065 0.826631 10.625 1.125 10.625H7.875V17.375C7.875 17.6734 7.99353 17.9595 8.2045 18.1705C8.41548 18.3815 8.70163 18.5 9 18.5C9.29837 18.5 9.58452 18.3815 9.7955 18.1705C10.0065 17.9595 10.125 17.6734 10.125 17.375V10.625H16.875C17.1734 10.625 17.4595 10.5065 17.6705 10.2955C17.8815 10.0845 18 9.79837 18 9.5C18 9.20163 17.8815 8.91548 17.6705 8.7045C17.4595 8.49353 17.1734 8.375 16.875 8.375Z" fill="#9BD8B5" />
                    </svg>

                </div>
                <div className="track-name">
                    <div className="track-name-big-text">
                        <span>{currentTrackMovie}</span>
                    </div>
                    <div className="track-name-small-text">
                        <span>{currentTrackYear}</span>
                    </div>
                </div>
                <div className="heart-icon">
                    <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.2955 2.40686C18.2198 1.32835 16.7938 0.670091 15.2752 0.550985C13.7566 0.431879 12.2455 0.859781 11.0148 1.7574C9.72363 0.797038 8.11655 0.361566 6.51717 0.538673C4.91779 0.71578 3.44492 1.49231 2.39515 2.71189C1.34539 3.93147 0.796707 5.50351 0.859603 7.11143C0.922498 8.71936 1.5923 10.2437 2.73412 11.3776L9.03596 17.6896C9.56366 18.2089 10.2744 18.5 11.0148 18.5C11.7552 18.5 12.4659 18.2089 12.9936 17.6896L19.2955 11.3776C20.4803 10.1855 21.1453 8.57299 21.1453 6.89223C21.1453 5.21146 20.4803 3.59897 19.2955 2.40686ZM17.8646 9.97718L11.5628 16.279C11.4911 16.3514 11.4057 16.4089 11.3117 16.4481C11.2176 16.4874 11.1167 16.5076 11.0148 16.5076C10.9129 16.5076 10.812 16.4874 10.7179 16.4481C10.6239 16.4089 10.5385 16.3514 10.4668 16.279L4.16497 9.94674C3.36913 9.13323 2.92349 8.04043 2.92349 6.90237C2.92349 5.76432 3.36913 4.67152 4.16497 3.85801C4.97594 3.05733 6.0697 2.60837 7.20934 2.60837C8.34897 2.60837 9.44273 3.05733 10.2537 3.85801C10.348 3.95312 10.4603 4.02862 10.5839 4.08014C10.7076 4.13166 10.8402 4.15818 10.9742 4.15818C11.1082 4.15818 11.2408 4.13166 11.3645 4.08014C11.4881 4.02862 11.6004 3.95312 11.6947 3.85801C12.5057 3.05733 13.5994 2.60837 14.7391 2.60837C15.8787 2.60837 16.9725 3.05733 17.7834 3.85801C18.5902 4.66086 19.0505 5.74774 19.0657 6.88582C19.0808 8.0239 18.6497 9.12267 17.8646 9.94674V9.97718Z" fill="#9BD8B5" />
                    </svg>

                </div>

            </div>
            <div className="range-section">
                <div className="time-durations">
                    <span>{isLoading ? 'Loading...' : formatTime(currentTime)}</span>
                    <span>-{formatTime(duration - currentTime)}</span>

                </div>
                <div className="range-progress">
                    <input
                        type="range"
                        min="0"
                        max={duration}
                        step="1"
                        value={currentTime}
                        onChange={(e) => {
                            audioRef.current.currentTime = parseFloat(e.target.value);
                            setCurrentTime(parseFloat(e.target.value));
                        }}
                    />
                </div>

            </div>
            <div className="control-section">
                <div className="backward-icons">
                    <svg onClick={playPreviousTrack} xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                        <path d="M14.9945 16.8041C13.4175 16.8041 11.9411 16.1866 10.8457 15.1387" stroke="#828282" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6.14938 6.85616C4.78339 5.56428 2.951 4.8042 0.994629 4.8042" stroke="#828282" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M21.6378 17.8481C22.2645 17.4564 22.2645 16.5438 21.6378 16.1521L16.5246 12.9563C15.8586 12.5401 14.9946 13.0189 14.9946 13.8043V20.1958C14.9946 20.9813 15.8586 21.4601 16.5246 21.0438L21.6378 17.8481Z" fill="#828282" />
                        <path d="M14.9946 4.8042V4.8042C12.5724 4.8042 10.3878 6.26063 9.45617 8.49651L7.91771 12.1888C6.75318 14.9837 4.02239 16.8042 0.994629 16.8042V16.8042" stroke="#828282" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M20.6378 5.84808C21.2645 5.45642 21.2645 4.54375 20.6378 4.15209L15.5246 0.956334C14.8586 0.540054 13.9946 1.0189 13.9946 1.80433V8.19584C13.9946 8.98127 14.8586 9.46012 15.5246 9.04384L20.6378 5.84808Z" fill="#828282" />
                    </svg>
                    <svg onClick={playPreviousTrack} xmlns="http://www.w3.org/2000/svg" width="23" height="18" viewBox="0 0 23 18" fill="none">
                        <path d="M10.5111 9.81929C9.94239 9.42119 9.94239 8.57893 10.5111 8.18082L20.9265 0.890026C21.5893 0.426082 22.5 0.900234 22.5 1.70926V16.2909C22.5 17.0999 21.5893 17.574 20.9265 17.1101L10.5111 9.81929Z" fill="#27AE60" />
                        <path d="M1.29968 9.81929C0.730968 9.42119 0.730968 8.57893 1.29968 8.18082L11.7151 0.890026C12.3779 0.426082 13.2886 0.900234 13.2886 1.70926V16.2909C13.2886 17.0999 12.3779 17.574 11.7151 17.1101L1.29968 9.81929Z" fill="#27AE60" />
                    </svg>

                </div>
                <div className="play-pause-button">
                    <button onClick={togglePlayPause}>
                        {isPlaying ? <span>||</span> : <span>▶</span>}</button>
                </div>
                <div className='forward-icons'>
                    <svg onClick={playNextSong} xmlns="http://www.w3.org/2000/svg" width="23" height="18" viewBox="0 0 23 18" fill="none">
                        <path d="M12.4889 9.81929C13.0576 9.42119 13.0576 8.57893 12.4889 8.18082L2.07346 0.890026C1.41069 0.426082 0.5 0.900234 0.5 1.70926V16.2909C0.5 17.0999 1.41068 17.574 2.07346 17.1101L12.4889 9.81929Z" fill="#27AE60" />
                        <path d="M21.7003 9.81929C22.269 9.42119 22.269 8.57893 21.7003 8.18082L11.2849 0.890026C10.6221 0.426082 9.71143 0.900234 9.71143 1.70926V16.2909C9.71143 17.0999 10.6221 17.574 11.2849 17.1101L21.7003 9.81929Z" fill="#27AE60" />
                    </svg>
                    <svg onClick={playNextSong} xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                        <path d="M20.5353 5.34808C21.162 4.95642 21.162 4.04375 20.5353 3.65209L15.4221 0.456334C14.756 0.0400544 13.8921 0.518898 13.8921 1.30433V7.69584C13.8921 8.48127 14.756 8.96012 15.4221 8.54384L20.5353 5.34808Z" fill="#828282" />
                        <path d="M1.36217 18.3481C0.735499 17.9564 0.7355 17.0438 1.36217 16.6521L6.47537 13.4563C7.14142 13.0401 8.00537 13.5189 8.00537 14.3043V20.6958C8.00537 21.4813 7.14142 21.9601 6.47537 21.5438L1.36217 18.3481Z" fill="#828282" />
                        <path d="M2.89209 10.3042V10.3042C2.89209 6.99049 5.57838 4.3042 8.89209 4.3042V4.3042H13.8921" stroke="#828282" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M17.8921 11.3042V11.3042C17.8921 14.6179 15.2058 17.3042 11.8921 17.3042V17.3042H6.89209" stroke="#828282" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>

            <div className="volume-section">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7.69351 0.40053C8.35538 -0.0722337 9.27475 0.40089 9.27475 1.21426V12.7858C9.27475 13.5992 8.35538 14.0723 7.69351 13.5995L3.86448 10.8645H2C0.89543 10.8645 0 9.96908 0 8.86451V5.13555C0 4.03098 0.895431 3.13555 2 3.13555H3.86448L7.69351 0.40053Z" fill="#828282" />
                    <path d="M11.5885 10.7913C12.5476 9.81507 13.1391 8.47662 13.1391 7C13.1391 5.51718 12.5426 4.17369 11.5764 3.19641" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div className="range-progress">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                    <path d="M7.83267 0.40053C8.49454 -0.0722337 9.41391 0.40089 9.41391 1.21426V12.7858C9.41391 13.5992 8.49454 14.0723 7.83267 13.5995L4.00364 10.8645H2.13916C1.03459 10.8645 0.13916 9.96908 0.13916 8.86451V5.13555C0.13916 4.03098 1.03459 3.13555 2.13916 3.13555H4.00364L7.83267 0.40053Z" fill="#828282" />
                    <path d="M11.7277 10.7913C12.6867 9.81507 13.2783 8.47662 13.2783 7C13.2783 5.51718 12.6818 4.17369 11.7156 3.19641" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M13.8796 0.988403C15.4182 2.52694 16.3698 4.6524 16.3698 7.00012C16.3698 9.34784 15.4182 11.4733 13.8796 13.0118" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <audio ref={audioRef} />

            <div className='headphone-display'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                    <path d="M7.77778 0C6.75639 0 5.74499 0.201178 4.80135 0.592048C3.85771 0.982918 3.00029 1.55582 2.27806 2.27806C0.819442 3.73667 0 5.71498 0 7.77778V13.2222C0 13.4285 0.0819442 13.6263 0.227806 13.7722C0.373667 13.9181 0.571498 14 0.777778 14H3.11111C3.72995 14 4.32344 13.7542 4.76103 13.3166C5.19861 12.879 5.44444 12.2855 5.44444 11.6667V10.1111C5.44444 9.49227 5.19861 8.89878 4.76103 8.46119C4.32344 8.02361 3.72995 7.77778 3.11111 7.77778H1.55556C1.55556 6.12754 2.21111 4.5449 3.378 3.378C4.5449 2.21111 6.12754 1.55556 7.77778 1.55556C9.42801 1.55556 11.0107 2.21111 12.1776 3.378C13.3444 4.5449 14 6.12754 14 7.77778H12.4444C11.8256 7.77778 11.2321 8.02361 10.7945 8.46119C10.3569 8.89878 10.1111 9.49227 10.1111 10.1111V11.6667C10.1111 12.2855 10.3569 12.879 10.7945 13.3166C11.2321 13.7542 11.8256 14 12.4444 14H14.7778C14.9841 14 15.1819 13.9181 15.3278 13.7722C15.4736 13.6263 15.5556 13.4285 15.5556 13.2222V7.77778C15.5556 5.71498 14.7361 3.73667 13.2775 2.27806C11.8189 0.819442 9.84057 0 7.77778 0ZM3.11111 9.33333C3.31739 9.33333 3.51522 9.41528 3.66108 9.56114C3.80694 9.707 3.88889 9.90483 3.88889 10.1111V11.6667C3.88889 11.8729 3.80694 12.0708 3.66108 12.2166C3.51522 12.3625 3.31739 12.4444 3.11111 12.4444H1.55556V9.33333H3.11111ZM14 12.4444H12.4444C12.2382 12.4444 12.0403 12.3625 11.8945 12.2166C11.7486 12.0708 11.6667 11.8729 11.6667 11.6667V10.1111C11.6667 9.90483 11.7486 9.707 11.8945 9.56114C12.0403 9.41528 12.2382 9.33333 12.4444 9.33333H14V12.4444Z" fill="#27AE60" />
                </svg>
                <span>Airpods Pro (Dave)</span>
            </div>


        </div>
    )
}
