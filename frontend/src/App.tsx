import { useEffect, useState } from 'react'
import './App.css'
import { Grid } from '@mui/material'
import { Feed } from './Feed'
import { type IRssFeedWithArticles } from '@dh-home-page/models/RssFeedDto'

function App (): JSX.Element {
  const [feeds, setFeeds] = useState<IRssFeedWithArticles[]>([])

  useEffect(() => {
    void (async () => {
      const response = await fetch('/feeds')

      setFeeds((await response.json()) as IRssFeedWithArticles[])
    })()
  }, [])

  return (
        <>
            <Grid container spacing={2}>
                {feeds.map((feed: IRssFeedWithArticles) => (
                    <Grid key={feed.title + feed.websiteUrl} item sm={12} md={6} lg={4}>
                        <Feed feed={feed} />
                    </Grid>
                ))}
            </Grid>
        </>
  )
}

export default App
