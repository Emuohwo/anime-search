import React from 'react';

export interface IAnimeDetailProps {
    animeDetail: {
        mal_id: number;
        title: string;
        image_url: string;
    }
}

function AnimeDetail(props: IAnimeDetailProps) {
  return <div>

  </div>;
}

export default AnimeDetail;
