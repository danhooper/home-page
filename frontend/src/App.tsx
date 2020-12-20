import React, {useEffect, useState} from 'react';
import { createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactHtmlParser from 'react-html-parser';
import './App.css';
import {IRssArticle, RssArticle} from './models/RssArticle';
import {IRssFeed, RssFeed} from './models/RssFeed';

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
    backgroundColor: theme.palette.primary.main,
  },
  feedDetail: {
    border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: '3px',
    margin: '15px 7px 0 7px',
  },
  feedHeading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightBold,
    textAlign: 'center',
    marginBottom: '5px',
  },
  feedLink: {
    color: theme.palette.secondary.main,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  articleDetail: {
    '& img': {
      maxWidth: '100%',
      objectFit: 'contain',
    }
  },
  accordionSummary: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    }
  }
}));

function App() {
  const [feeds, setFeeds] = useState<RssFeed[]>([]);
  const classes = useStyles();
  useEffect(() => {
    fetch('/rss').then(response => response.json()).then((feeds: IRssFeed[]) => setFeeds(feeds.slice(0, 10).map(f => new RssFeed(f))));
  }, []);

  return (
    <div className={classes.root}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <ThemeProvider theme={theme}>
        <RssFeedList feeds={feeds} />
      </ThemeProvider>
    </div>
  );
}

function RssFeedList(props: {feeds: RssFeed[]}) {
  const feeds = props.feeds.map((feed) => (<Grid item md={4} sm={12} key={feed.id}><RssFeedDetail feed={feed} /></Grid>));

  return (
    <Grid container spacing={1}>
      {feeds}
    </Grid>
  );
}

function RssFeedDetail(props: {feed: RssFeed}) {
  const feed = props.feed;
  const [articles, setArticles] = useState<RssArticle[]>([]);
  const classes = useStyles();

  useEffect(() => {
    fetch(`/rss/${feed.id}/article`)
    .then(response => response.json())
    .then((articles: IRssArticle[]) => setArticles(articles.slice(0, 10).map(art => new RssArticle(art))));
  }, [feed.id]);

  return (
    <div className={classes.feedDetail}>
      <div className={classes.feedHeading}>
        <a href={feed.websiteUrl} className={classes.feedLink}>
          {feed.title}
        </a>
        </div>
      {articles.map(article => (
        <Accordion TransitionProps={{ unmountOnExit: true }} key={article.title + article.url}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon color="secondary" />}
            className={classes.accordionSummary}
          >
            <Typography className={classes.heading}>{article.title}</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.articleDetail}>
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
