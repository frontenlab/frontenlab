import React, { useState } from 'react';
import './FAQ.css';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
} from '@chakra-ui/react';
import Faqs from '../../../Helpers/Faqs';

const FAQ = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleAccordionChange = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="FAQ">
            <h1 className='title'>FAQs</h1>

            <div className="faq-container">
                <Accordion index={expandedIndex} onChange={(index) => setExpandedIndex(index)}>
                    {Faqs.map((faq, index) => (
                        <AccordionItem key={faq.id}>
                            {({ isExpanded }) => (
                                <>
                                    <h2>
                                        <AccordionButton onClick={() => handleAccordionChange(index)}>
                                            <Box
                                                as='span'
                                                flex='1'
                                                textAlign='left'
                                                color={expandedIndex === index ? "#ff6f61" : "#5a647d"}
                                                height="42px"
                                                display="flex"
                                                alignItems="center"
                                                fontSize="20px"
                                                padding="40px 0px"
                                            >
                                                {faq.question}
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel
                                        pb={4}
                                        className={`accordion-panel ${isExpanded ? 'expanded' : 'collapsed'}`}
                                        color="#5a647d"
                                    >
                                        {faq.answer}
                                    </AccordionPanel>
                                </>
                            )}
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <hr />
        </div>
    );
}

export default FAQ;
