import React from 'react';

export default function TopChart({ playlist, playTrack }) {

    const topsongIndicesToMap = [4, 5, 0, 10];  //top tracks
    const youmaylike = [1, 6, 9];                 //you may like

    return (
        <div className="top-chart">
            <div className="title">
                <p>Discover  New music</p>
            </div>
            <div className="image-chart-title">
                <div className="title1">
                    <p>Top-chart</p>
                </div>
                <div className="title2">
                    <p>week</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                        <path d="M4.75692 5.82849L0.513916 1.58549L1.92892 0.171494L4.75692 3.00049L7.58492 0.171494L8.99992 1.58549L4.75692 5.82849Z" fill="#828282" />
                    </svg>
                </div>
            </div>
            <div className="image-gallery"> {/* top songs*/}
                {topsongIndicesToMap.map((index) => (
                    <div className="image-card" key={index} onClick={() => playTrack(index)}>
                        <div className="images">
                            <img src={playlist[index].image} alt={playlist[index].title} />
                        </div>
                        <div className="image-description-big-text">
                            <p>{playlist[index].title}</p>
                        </div>
                        <div className="image-description-small-text">
                            <p>
                                {playlist[index].movie} {playlist[index].year}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="you-may-like">
                <p>You may like</p>
            </div>  {/* you may like tracks*/}
            {youmaylike.map((index) => (
                <div className="track-list" key={index} onClick={() => playTrack(index)}>
                    <div className="track-list-image">
                        <img src={playlist[index].image} alt={playlist[index].title} />
                    </div>
                    <div class="track-list-description">
                        <div className="track-list-description-big-text">
                            <div className="song-name">
                                <p>{playlist[index].title} <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 0.5C0.89543 0.5 0 1.39543 0 2.5V8.5C0 9.60457 0.895429 10.5 2 10.5H13.3333C14.4379 10.5 15.3333 9.60457 15.3333 8.5V2.5C15.3333 1.39543 14.4379 0.5 13.3333 0.5H2ZM7.52005 5.9933C7.5485 5.82263 7.56272 5.63063 7.56272 5.4173C7.56272 4.8413 7.43827 4.33285 7.18938 3.89196C6.94761 3.44396 6.60272 3.09907 6.15472 2.8573C5.71383 2.61552 5.2125 2.49463 4.65072 2.49463C4.06761 2.49463 3.55205 2.61907 3.10405 2.86796C2.65605 3.11685 2.30761 3.47241 2.05872 3.93463C1.80983 4.39685 1.68538 4.93374 1.68538 5.5453C1.68538 6.14974 1.80983 6.68307 2.05872 7.1453C2.31472 7.60752 2.66672 7.96663 3.11472 8.22263C3.56983 8.47152 4.08183 8.59596 4.65072 8.59596C5.35472 8.59596 5.9485 8.41463 6.43205 8.05196C6.91561 7.68218 7.24272 7.21285 7.41338 6.64396H5.80272C5.56805 7.12041 5.17338 7.35863 4.61872 7.35863C4.23472 7.35863 3.91116 7.23774 3.64805 6.99596C3.38494 6.75418 3.23561 6.41996 3.20005 5.9933H7.52005ZM5.60005 4.0733C5.87027 4.30085 6.00894 4.60663 6.01605 4.99063H3.21072C3.26761 4.59241 3.4205 4.28307 3.66938 4.06263C3.92538 3.83507 4.23827 3.7213 4.60805 3.7213C4.99916 3.7213 5.32983 3.83863 5.60005 4.0733ZM10.7007 6.6653L11.9167 8.49996H13.6021L11.6394 5.53463L13.5807 2.59063H11.9807L10.8927 4.41463L9.68738 2.59063H8.00205L9.95405 5.53463L8.02338 8.49996H9.62338L10.7007 6.6653Z" fill="#BDBDBD" />
                                </svg>
                                </p>
                            </div>
                            <div className="song-time">
                                <p>{playlist[index].duration}</p>
                            </div>
                        </div>
                        <div className="track-list-description-small-text">
                            <div className="song-description">
                                <p>{playlist[index].movie}</p>
                            </div>
                            <div className="song-year">
                                <p>{playlist[index].year}</p>
                            </div>
                        </div>

                    </div>
                </div>
            ))}


        </div>
    )
}
