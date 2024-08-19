import React, { useState, useContext, createContext } from 'react';
import Player from '../player';
import {
  Container,
  Group,
  Title,
  SubTitle,
  Text,
  Button2,
  Button,
  Feature,
  FeatureTitle,
  FeatureText,
  FeatureClose,
  Maturity,
  Content,
  Meta,
  Entities,
  Item,
  Image,
} from './styles/card';
import Swal from 'sweetalert2';
import { userServiceUpdate, userServiceRemoveWatchList } from '../../services';

export const FeatureContext = createContext();

export default function Card({ children, ...restProps }) {
  const [showFeature, setShowFeature] = useState(false);
  const [itemFeature, setItemFeature] = useState({});

  return (
    <FeatureContext.Provider value={{ showFeature, setShowFeature, itemFeature, setItemFeature }}>
      <Container {...restProps}>{children}</Container>
    </FeatureContext.Provider>
  );
}

Card.Group = function CardGroup({ children, ...restProps }) {
  return <Group {...restProps}>{children}</Group>;
};

Card.Title = function CardTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Card.Button2 = function CardButton2({ children, slug, userEmail, watchList, ...restProps }) {
  const [isWatchListed, setIsWatchListed] = useState(watchList);
  const handleWatchListClick = () => {
    if (isWatchListed) {
      handleWatchListRemove();
    } else {
      handleWatchListAdd();
    }
    setIsWatchListed(!isWatchListed);
  };

  const handleWatchListAdd = async () => {
    try {
      const formData = new FormData();
      formData.append('email',userEmail);
      formData.append('watchlist',slug);
      await userServiceUpdate(formData);
      Swal.fire({
        title: 'Watch List Added!',
        text: slug + ' added to watch list',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.log(error)
    }
  };

  const handleWatchListRemove = async () => {
    try {
      const formData = new FormData();
      formData.append('email',userEmail);
      formData.append('watchlist',slug);
      await userServiceRemoveWatchList(formData);
      Swal.fire({
        title: 'Watch List Removed!',
        text: slug + ' removed from watch list',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.log(error)
    }
  };
  return <Button2 
    onClick={() => {
      handleWatchListClick();
    }}
    {...restProps}>{isWatchListed ? 'Remove' : 'Add to watchlist'}
  </Button2>;
};

Card.SubTitle = function CardSubTitle({ children, ...restProps }) {
  return <SubTitle {...restProps}>{children}</SubTitle>;
};

Card.Text = function CardText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

Card.Entities = function CardEntities({ children, ...restProps }) {
  return <Entities {...restProps}>{children}</Entities>;
};

Card.Meta = function CardMeta({ children, ...restProps }) {
  return <Meta {...restProps}>{children}</Meta>;
};

Card.Item = function CardItem({ item, children, ...restProps }) {
  const { setShowFeature, setItemFeature } = useContext(FeatureContext);

  return (
    <Item
      onClick={() => {
        setItemFeature(item);
        setShowFeature(true);
      }}
      {...restProps}
    >
      {children}
    </Item>
  );
};

Card.Image = function CardImage({ ...restProps }) {
  return <Image {...restProps} />;
};

Card.Feature = function CardFeature({ children, category, userEmail, ...restProps }) {
  const { showFeature, itemFeature, setShowFeature } = useContext(FeatureContext);

  return showFeature ? (
    <Feature {...restProps} src={`/images/${category}/${itemFeature.genre}/${itemFeature.slug}/large.jpg`}>
      <Content>
        <FeatureTitle>{itemFeature.title}</FeatureTitle>
        <FeatureText>{itemFeature.description}</FeatureText>
        <FeatureClose onClick={() => setShowFeature(false)}>
          <img src="/images/icons/close.png" alt="Close" />
        </FeatureClose>

        <Group margin="30px 0" flexDirection="row" alignItems="center">
          <Maturity rating={itemFeature.maturity}>{itemFeature.maturity < 12 ? 'PG' : itemFeature.maturity}</Maturity>
          <FeatureText fontWeight="bold">
            {itemFeature.genre.charAt(0).toUpperCase() + itemFeature.genre.slice(1)}
          </FeatureText>
        </Group>
        <Player>
          <Player.Button userEmail={userEmail} title = {itemFeature.slug}/>
          <Player.Video src="/videos/bunny.mp4" />
        </Player>
      </Content>
    </Feature>
  ) : null;
};
