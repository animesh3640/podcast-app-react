import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import { useDispatch, useSelector } from 'react-redux'
import { setPodcasts } from '../slices/podcastSlice';
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../firebase';
import PodcastCard from '../components/Podcasts/PodcastsCard';
import InputComponent from '../components/common/Input'
function PodcastsPage() {
    const dispatch = useDispatch();
    const podcasts = useSelector((state) => state.podcasts.podcasts)
    const [search, setSearch] = useState('');
    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, 'podcasts')),
            (querySnapshot) => {
                const podcastsData = [];
                querySnapshot.forEach((doc) => {
                    podcastsData.push({ id: doc.id, ...doc.data() });
                });
                dispatch(setPodcasts(podcastsData));
            },
            (error) => {
                console.log('Error fetching podcasts:', error)
            }
        );
        return () => {
            unsubscribe();
        };

    }, [dispatch]);

    var filteredPodcasts = podcasts.filter((item) => 
    item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
    );

    return (
        <div>
            <Header />
            <div className="input-wrapper">
                <h1>Discover Podcasts</h1>
                <InputComponent
                    state={search}
                    setState={setSearch}
                    placeholder='Search By Title'
                    type="text"
                />
                {filteredPodcasts.length > 0
                    ?
                    <div className='podcasts-flex' style={{marginTop:'1.5rem'}}>
                        {
                            filteredPodcasts.map((podcast) => (
                                <PodcastCard
                                    key={podcast.id}
                                    id={podcast.id}
                                    title={podcast.title}
                                    displayImage={podcast.displayImage}
                                />
                            ))
                        }
                    </div>
                    : <p>{search?'Podcast Not Found':'No Podcast On The Platform'}</p>
                }
            </div>
        </div>
    )
}

export default PodcastsPage