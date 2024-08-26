import React, { useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';
import { Container, Button, Overlay, Inner, Close, ButtonContainer, Button2 } from './styles/player';
import { userServiceUpdate, userServiceRemoveWatchList, distributorPayment } from '../../services';
import Swal from 'sweetalert2';

export const PlayerContext = createContext();

export default function Player({ children, ...restProps }) {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <PlayerContext.Provider value={{ showPlayer, setShowPlayer }}>
      <Container {...restProps}>{children}</Container>
    </PlayerContext.Provider>
  );
}

Player.Video = function PlayerVideo({ src, ...restProps }) {
  const { showPlayer, setShowPlayer } = useContext(PlayerContext);

  return showPlayer
    ? ReactDOM.createPortal(
        <Overlay onClick={() => setShowPlayer(false)} data-testid="player">
          <Inner>
            <video id="netflix-player" controls>
              <source src={src} type="video/mp4" />
            </video>
            <Close />
          </Inner>
        </Overlay>,
        document.body
      )
    : null;
};

Player.Button = function PlayerButton({ userEmail, title, ...restProps }) {
  const [isWatchListed, setIsWatchListed] = useState(false);
  const { showPlayer, setShowPlayer } = useContext(PlayerContext);
  const handleClick = async () => {
    setShowPlayer((showPlayer) => !showPlayer);
    try {
      const formData = new FormData();
      formData.append('email',userEmail);
      formData.append('history',title);
      await userServiceUpdate(formData);
      const paymentFormData = new FormData();
      formData.append('email',userEmail);
      formData.append('title',title);
      await distributorPayment(paymentFormData);

    } catch (error) {
      console.log(error)
    }
  };
  const handleWatchListClick = () => {
    if (isWatchListed) {
      console.log("Remove watchlist")
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
      formData.append('watchlist',title);
      await userServiceUpdate(formData);
      Swal.fire({
        title: 'Watch List Added!',
        text: title + ' added to watch list',
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
      formData.append('watchlist',title);
      await userServiceRemoveWatchList(formData);
      Swal.fire({
        title: 'Watch List Removed!',
        text: title + ' removed from watch list',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <ButtonContainer>
      <Button onClick={handleClick} {...restProps}>
        Play
      </Button>
      <Button onClick={handleWatchListClick} {...restProps}>
        {isWatchListed ? 'Remove' : 'Add to watchlist'}
      </Button>
    </ButtonContainer>
  );
};
