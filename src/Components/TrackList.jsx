import React from 'react';


export default function TrackList({ playlist, playTrack }) {
    return (
        <div className='track-list'>
            <div className='title'>Track List</div>
            <div className='forward-backward-icons'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
                    <path d="M13.358 14.1233C11.9659 14.1233 10.6627 13.5783 9.6958 12.6533" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M5.55017 5.34215C4.3444 4.20179 2.72692 3.53085 1 3.53085" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M19.0628 15.1444C19.6895 14.7527 19.6895 13.84 19.0628 13.4484L14.8879 10.839C14.2219 10.4228 13.3579 10.9016 13.3579 11.687V16.9057C13.3579 17.6911 14.2219 18.17 14.8879 17.7537L19.0628 15.1444Z" fill="#BDBDBD" />
                    <path d="M13.358 3.53087V3.53087C11.2199 3.53087 9.29148 4.81648 8.46912 6.79012L7.1111 10.0494C6.08316 12.5164 3.67264 14.1234 1 14.1234V14.1234" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M18.1803 4.55177C18.8069 4.1601 18.8069 3.24744 18.1803 2.85577L14.0053 0.246446C13.3393 -0.169834 12.4753 0.309009 12.4753 1.09444V6.3131C12.4753 7.09853 13.3393 7.57738 14.0053 7.1611L18.1803 4.55177Z" fill="#BDBDBD" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                    <path d="M19.954 5.4157C20.6667 5.04087 20.6667 4.02038 19.954 3.64556L15.1024 1.09407C14.4365 0.743875 13.637 1.22677 13.637 1.97914V7.08212C13.637 7.83449 14.4365 8.31738 15.1024 7.96718L19.954 5.4157Z" fill="#BDBDBD" />
                    <path d="M1.43318 16.3545C0.720465 15.9797 0.720465 14.9592 1.43318 14.5844L6.28478 12.0329C6.95068 11.6827 7.75024 12.1656 7.75024 12.918V18.021C7.75024 18.7733 6.95068 19.2562 6.28478 18.906L1.43318 16.3545Z" fill="#BDBDBD" />
                    <path d="M2.63696 9.41452V9.41452C2.63696 6.62619 4.89734 4.36581 7.68566 4.36581H8.63696H13.637" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M17.637 10.256V10.256C17.637 13.0443 15.3766 15.3047 12.5883 15.3047H11.637H6.63696" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <div className='play-list'>
                <div className='select-song-from-list'>Select Song to Play</div>
                {/*mapping sons from musicplayer content area component */}
                {playlist.map((song,index) => (
                    <div className='song-list'  key={index} onClick={() => playTrack(index)}>
                        <div className='icons'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3.33325 5.33333H12.6666C12.8434 5.33333 13.013 5.2631 13.138 5.13807C13.263 5.01305 13.3333 4.84348 13.3333 4.66667C13.3333 4.48986 13.263 4.32029 13.138 4.19526C13.013 4.07024 12.8434 4 12.6666 4H3.33325C3.15644 4 2.98687 4.07024 2.86185 4.19526C2.73682 4.32029 2.66659 4.48986 2.66659 4.66667C2.66659 4.84348 2.73682 5.01305 2.86185 5.13807C2.98687 5.2631 3.15644 5.33333 3.33325 5.33333ZM13.9999 7.33333H1.99992C1.82311 7.33333 1.65354 7.40357 1.52851 7.5286C1.40349 7.65362 1.33325 7.82319 1.33325 8C1.33325 8.17681 1.40349 8.34638 1.52851 8.4714C1.65354 8.59643 1.82311 8.66667 1.99992 8.66667H13.9999C14.1767 8.66667 14.3463 8.59643 14.4713 8.4714C14.5963 8.34638 14.6666 8.17681 14.6666 8C14.6666 7.82319 14.5963 7.65362 14.4713 7.5286C14.3463 7.40357 14.1767 7.33333 13.9999 7.33333ZM12.6666 10.6667H3.33325C3.15644 10.6667 2.98687 10.7369 2.86185 10.8619C2.73682 10.987 2.66659 11.1565 2.66659 11.3333C2.66659 11.5101 2.73682 11.6797 2.86185 11.8047C2.98687 11.9298 3.15644 12 3.33325 12H12.6666C12.8434 12 13.013 11.9298 13.138 11.8047C13.263 11.6797 13.3333 11.5101 13.3333 11.3333C13.3333 11.1565 13.263 10.987 13.138 10.8619C13.013 10.7369 12.8434 10.6667 12.6666 10.6667Z" fill="#BDBDBD" />
                            </svg>
                            <img src={song.image} alt={song.title} />
                        </div>
                        <div className="song-details">
                            <div className='song-description'>
                                <span>{song.title}</span>
                                <span>{song.duration}</span>
                            </div>
                            <div className='movie-description'>
                                <span>{song.movie}</span>
                                <span>{song.year}</span>
                            </div>

                        </div>


                    </div>
                ))

                }
            </div>
        </div>


    );
}
