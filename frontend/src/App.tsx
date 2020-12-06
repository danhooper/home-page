import React, {useEffect, useState} from 'react';
import { createMuiTheme, makeStyles, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactHtmlParser from 'react-html-parser';
import './App.css';
import {IRssArticle, RssArticle} from './models/RssArticle';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#424242',
    },
    secondary: {
      main: '#ff8a65',
    },
  },
});

// const Accordion = withStyles({
//   expanded: {},
// })(MuiAccordion);

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function App() {
  const [feeds, setFeeds] = useState([]);
  useEffect(() => {
    fetch('/rss').then(response => response.json()).then(feeds => setFeeds(feeds));
  }, []);

  return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <ThemeProvider theme={theme}>
        <RssFeedList feeds={feeds} />
      </ThemeProvider>
    </div>
  );
}

function RssFeedList(props: {feeds: any[]}) {
  const feeds = props.feeds.map((feed) => (<Grid item xs={4}><RssFeed key={feed.id} feed={feed} /></Grid>));

  return (
    <Grid container spacing={1}>
      {feeds}
    </Grid>
  );
}

function RssFeed(props: {feed: any}) {
  const feed = props.feed;
  const [articles, setArticles] = useState<RssArticle[]>([]);
  const classes = useStyles();

  useEffect(() => {
    fetch(`/rss/${feed.id}/article`)
    .then(response => response.json())
    .then((articles: IRssArticle[]) => setArticles(articles.slice(0, 10).map(art => new RssArticle(art))));
  }, [feed.id]);

  return (
    <div className={classes.root}>
      {feed.title}
      {articles.map(article => (
        <Accordion TransitionProps={{ unmountOnExit: true }} key={article.title + article.url}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon color="secondary" />}
          >
            <Typography className={classes.heading}>{article.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {ReactHtmlParser(article.longDescription)}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}


export default App;
