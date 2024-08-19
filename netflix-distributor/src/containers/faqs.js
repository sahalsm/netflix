import React from "react";
import faqData from "../fixtures/faqs"
import Accordion from "../components/accordion";
import { OptForm } from "../components";

export function FaqsContainer(){
    return(
        <Accordion>
            <Accordion.Title>Frequently Asked Questions</Accordion.Title>
            {faqData.map(item => 
                <Accordion.Item key={item.id}>
                    <Accordion.Header>{item.header}</Accordion.Header>
                    <Accordion.Body>{item.body}</Accordion.Body>
                </Accordion.Item>
            )}
            <OptForm>
                <OptForm.Input placeholder="Email Address" />
                <OptForm.Button>Try it Now</OptForm.Button>
                <OptForm.Break />
                <OptForm.Text>Ready to watch? Enter your email to create or restart your membership</OptForm.Text>
            </OptForm>
        </Accordion>
    );
}

