import { useState } from 'react'
import './App.css'
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Link
} from '@mui/material'
import { styled } from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { type IRssArticle } from '@dh-home-page/models/RssArticle'

const CustomizedAccordionDetails = styled(AccordionDetails)`
    img {
        max-width: 100%;
    }
    figure {
        margin: 0;
    }
`

const CustomizedAccordion = styled(Accordion)(({}) => ({
  backgroundColor: '#373737',
  '&:hover': {
    backgroundColor: '#333'
  },
  '&.Mui-expanded': {
    margin: 1,
    backgroundColor: '#121212'
  },
  '&:before': {
    backgroundColor: '#ff8a65'
  }
}))

const StyledExpandMoreIcon = styled(ExpandMoreIcon)(({}) => ({
  fill: '#ff8a65'
}))

export function Article ({ article }: { article: IRssArticle }): JSX.Element {
  const [expanded, setExpanded] = useState(false)

  return (
        <>
            <CustomizedAccordion
                expanded={expanded}
                onChange={() => {
                  setExpanded(!expanded)
                }}
                slotProps={{ transition: { unmountOnExit: true } }}
            >
                <AccordionSummary expandIcon={<StyledExpandMoreIcon />}>
                    {article.title}
                </AccordionSummary>
                <CustomizedAccordionDetails>
                    <div dangerouslySetInnerHTML={{ __html: article.htmlContent }} />
                </CustomizedAccordionDetails>
                <AccordionActions>
                    <Link href={article.link} target='_blank'>
                        View Article
                    </Link>
                </AccordionActions>
            </CustomizedAccordion>
        </>
  )
}
