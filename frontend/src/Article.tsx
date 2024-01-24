import { useEffect, useState, useRef } from 'react';
import './App.css';
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Link,
    type AccordionSlots,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { type IRssArticle } from '@dh-home-page/models/RssArticle';
import Fade from '@mui/material/Fade';

const CustomizedAccordionDetails = styled(AccordionDetails)`
    iframe {
        max-width: 100%;
    }
    div {
        max-width: 100%;
        overflow: hidden;
    }
    img {
        max-width: 100%;
        object-fit: contain;
    }
    figure {
        margin: 0;
    }
`;

const CustomizedAccordion = styled(Accordion)(({}) => ({
    backgroundColor: '#373737',
    '&::before': {
        backgroundColor: '#ff8a65',
    },
    '&:hover': {
        backgroundColor: '#333',
    },
    '&.Mui-expanded::before': {
        display: 'block !important',
        opacity: 1,
    },
    '&.Mui-expanded': {
        backgroundColor: '#121212',
    },
}));

const StyledExpandMoreIcon = styled(ExpandMoreIcon)(({}) => ({
    fill: '#ff8a65',
}));

export function Article({ article }: { article: IRssArticle }): JSX.Element {
    const [expanded, setExpanded] = useState(false);
    const accordionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (expanded) {
            setTimeout(() => {
                Array.from(accordionRef?.current?.querySelectorAll('a') ?? []).forEach(
                    (el: any) => {
                        el.setAttribute('target', '_blank');
                        el.setAttribute('rel', 'noopener');
                    },
                );
            }, 300);
        }
    }, [accordionRef, expanded]);

    return (
        <>
            <CustomizedAccordion
                expanded={expanded}
                disableGutters
                onChange={() => {
                    setExpanded(!expanded);
                }}
                slots={{ transition: Fade as AccordionSlots['transition'] }}
                slotProps={{ transition: { timeout: 300, unmountOnExit: true } }}
                sx={{
                    '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
                    '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
                }}
            >
                <AccordionSummary expandIcon={<StyledExpandMoreIcon />}>
                    {article.title}
                </AccordionSummary>
                <CustomizedAccordionDetails>
                    <div
                        ref={accordionRef}
                        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing, @typescript-eslint/strict-boolean-expressions
                        dangerouslySetInnerHTML={{ __html: article.htmlContent || article.content }}
                    />
                </CustomizedAccordionDetails>
                <AccordionActions>
                    <Link href={article.link} target='_blank'>
                        View Article
                    </Link>
                </AccordionActions>
            </CustomizedAccordion>
        </>
    );
}
