import React, { useState, useEffect } from 'react';

type Props = {
    width: number | undefined;
    height: number | undefined;
    url: string;
};

function YouTubeEmbed(props: Props) {
    const { width = 560, height = 315, url } = props;
    const [error, setError] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [videoId, setVideoId] = useState('');

    useEffect(() => {
        parseUrl();
    }, []);

    function parseUrl() {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        console.log({ match });

        if (match && match[7]?.length === 11) {
            setIsLoaded(true);
            setVideoId(match[7]);
        } else {
            setError('Неверная ссылка на видео');
        }
    }

    if (error) {
        return <div>{error}</div>;
    } else if (isLoaded) {
        const src = `https://www.youtube.com/embed/${videoId}`;
        return (
            <iframe
                style={{ maxHeight: '100vh', maxWidth: '100vw' }}
                title="YouTube video"
                width={width}
                height={height}
                src={src}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        );
    } else {
        return <div>Загружаю...</div>;
    }
}

export default YouTubeEmbed;
