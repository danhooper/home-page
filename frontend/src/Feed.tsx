import './App.css';
import { Link, Paper, Typography } from '@mui/material';
import { Article } from './Article';
import { styled } from '@mui/system';
import type { IRssFeedWithArticles } from '@dh-home-page/models/RssFeedDto';
import type { JSX } from 'react';

const StyledH4 = styled(Typography)({
    textAlign: 'center',
    marginTop: 10,
});

const StyledPaper = styled(Paper)({
    backgroundColor: '#373737',
    textAlign: 'center',
    padding: 10,
});

export function Feed({ feed }: { feed: IRssFeedWithArticles }): JSX.Element {
    return (
        <>
            <StyledH4 variant='h4'>
                <Link
                    target='_blank'
                    rel='noopener noreferrer'
                    href={feed.websiteUrl}
                    underline='none'
                >
                    {feed.title}
                </Link>
            </StyledH4>
            {feed.articles.map((article) => (
                <Article key={article.link} article={article} />
            ))}
            {feed.articles.length === 0 && (
                <StyledPaper>
                    <div>No Articles</div>
                </StyledPaper>
            )}
        </>
    );
}
