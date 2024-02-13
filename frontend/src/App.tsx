import { useEffect, useState } from 'react';
import './App.css';
import { CircularProgress, Grid } from '@mui/material';
import { Feed } from './Feed';
import { type IRssFeedWithArticles } from '@dh-home-page/models/RssFeedDto';

function App(): JSX.Element {
    const [feeds, setFeeds] = useState<IRssFeedWithArticles[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        void (async () => {
            const response = await fetch('/feeds');

            setFeeds((await response.json()) as IRssFeedWithArticles[]);
            setIsLoading(false)
        })();
    }, []);

    return (
        <>
            <Grid container spacing={2}>
              {isLoading && <Grid item sx={{display: 'flex', justifyContent: 'center', width: '100%'}}><CircularProgress /></Grid>}
                {feeds.map((feed: IRssFeedWithArticles) => (
                    <Grid
                        key={feed.title + feed.websiteUrl}
                        item
                        sm={12}
                        md={6}
                        lg={4}
                        sx={{ width: '100%' }}
                    >
                        <Feed feed={feed} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default App;
