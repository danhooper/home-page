import React, {useEffect, useState} from 'react';
import { createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { DomElement } from "htmlparser2";
import ReactHtmlParser, {Transform} from 'react-html-parser';
import './App.css';
import {IRssArticle, RssArticle} from './models/RssArticle';
import {IRssFeed, RssFeed} from './models/RssFeed';

const TEN_MINUTES_IN_MS = 10 * 60 * 1000;

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
    minHeight: '100vh',
    paddingBlock: '30px',
  },
  feedDetail: {
    border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: '3px',
    margin: '15px 10px 0 10px',
  },
  feedHeading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightBold,
    textAlign: 'center',
    padding: '5px',
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
    '& a': {
      color: theme.palette.secondary.main,
    },
    '& img': {
      maxWidth: '100%',
      objectFit: 'contain',
    },
    '& .feedflare': {
      height: 0,
      display: 'none',
    },
  },
  accordion: {
    '&.Mui-expanded': {
      backgroundColor: theme.palette.primary.dark,
    }
  },
  accordionSummary: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
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
    <Grid container spacing={0}>
      {feeds}
    </Grid>
  );
}

async function fetchArticles(feedId: number): Promise<RssArticle[]> {
      const response = await fetch(`/rss/${feedId}/article`);
      const articles: IRssArticle[] = await response.json();
  return articles.slice(0, 10).map(art => new RssArticle(art));
}

function RssFeedDetail(props: {feed: RssFeed}) {
  const feed = props.feed;
  const [articles, setArticles] = useState<RssArticle[]>([]);
  const classes = useStyles();

  const onChange = (event: any, expanded: boolean) => {console.log(event, expanded)}

  useEffect(() => {
  const fetcher = async () =>  {
      const articles = await fetchArticles(feed.id);
      setArticles(articles);
  };
    fetcher();
    setInterval(fetcher, TEN_MINUTES_IN_MS);
  }, [feed.id]);

const transform: Transform = (node: DomElement) => {
  // if (node.type === 'tag' && node.name = 'a') {
  //   node.a
  // }
  // console.log(node);
  return;
}

  return (
    <div className={classes.feedDetail}>
      <div className={classes.feedHeading}>
        <a href={feed.websiteUrl} className={classes.feedLink}>
          {feed.title}
        </a>
        </div>
      {articles.map(article => (
        <Accordion TransitionProps={{ unmountOnExit: true }} key={article.title + article.url} onChange={onChange} className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon color="secondary" />}
            className={classes.accordionSummary}
          >
            <Typography className={classes.heading}>{article.title}</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.articleDetail}>
            <Typography>
              {ReactHtmlParser(article.longDescription, {transform})}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}


export default App;
