import React from "react";
import { Container, Inner, Pane, Item, Title, SubTitle, Image } from "./styles/jumbotron";

export default function Jumbotron({children, direction = 'row', ...restprops}){
    return(
    <Item>
        <Inner direction={direction}>
            {children}
        </Inner>
    </Item>
    );
}

Jumbotron.Item = function JumbotronItem({children, ...restprops}){
    return(
        <Item {...restprops}>{children}</Item>
    );
}
Jumbotron.Container = function JumbotronContainer({children, ...restprops}){
    return(
        <Container {...restprops}>{children}</Container>
    );
}
Jumbotron.Pane = function JumbotronPane({children, ...restprops}){
    return(
        <Pane {...restprops}>{children}</Pane>
    );
}
Jumbotron.Title = function JumbotronTitle({children, ...restprops}){
    return(
        <Title {...restprops}>{children}</Title>
    );
}
Jumbotron.SubTitle = function JumbotronSubTitle({children, ...restprops}){
    return(
        <SubTitle {...restprops}>{children}</SubTitle>
    );
}
Jumbotron.Image = function JumbotronImage({...restprops}){
    return(
        <Image {...restprops}></Image>
    );
}