import React from "react";
import { HeaderContainer } from "../containers/header";
import { OptForm, Feature } from "../components";
import { JumbotronContainer } from "../containers/jumbotron";
import { FooterContainer } from "../containers/footer";
import { FaqsContainer } from "../containers/faqs";

export default function Home(){
    return(
    <>
        <HeaderContainer>
            <Feature>
                <Feature.Title>unlimited files, TV programmes and more.</Feature.Title>
                <Feature.SubTitle>Watch anywhere. Cabcel at any time.</Feature.SubTitle>
                <OptForm>
                    <OptForm.Input placeholder="Email Address" />
                    <OptForm.Button>Try it Now</OptForm.Button>
                    <OptForm.Break />
                    <OptForm.Text>Ready to watch? Enter your email to create or restart your membership</OptForm.Text>
                </OptForm>
            </Feature>
        </HeaderContainer>
        <JumbotronContainer />
        <FaqsContainer />
        <FooterContainer />
    </>
    );
}