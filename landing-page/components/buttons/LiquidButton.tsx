import React from 'react';
import { Button, Box } from '@mui/material';

interface LiquidButtonProps {
  variant: 'dima' | 'elixir';
}

const LiquidButton: React.FC<LiquidButtonProps> = ({ variant }) => {
  let backgroundColor = 'primary.main';
  let backgroundImage = '';

  // Set background color and image based on variant prop
  if (variant === 'dima') {
    backgroundColor = 'primary.dark';
    backgroundImage = 'url("/assets/btns/pink-wave.png")';
  } else if (variant === 'elixir') {
    backgroundColor = 'primary.main';
    backgroundImage = 'url("/assets/btns/red-wave.png")';
  }

  return (
    <Button
      sx={{
        position: 'relative',
        color: 'white',
        fontSize: '15px',
        fontWeight: '600',
        letterSpacing: '3px',
        lineHeight: '16px',
        overflow: 'hidden',
        padding: '10px 30px',
        textTransform: 'none',
        backgroundColor: backgroundColor,
        cursor: 'pointer',
        height: '40px', // Update the height here
        width: '140px', // Update the width here
        '&:hover .text, &:focus .text, &:active .text': {
          color: '#ffffff',
        },
        '&:hover .waveContainer, &:focus .waveContainer, &:active .waveContainer': {
          top: '0',
        },
      }}
    >
      <Box
        className="text"
        sx={{
          position: 'relative',
          transition: 'color 1s ease',
          zIndex: 1,
        }}
      >
        Découvrir
      </Box>
      <Box
        className="waveContainer"
        sx={{
          backgroundColor: backgroundColor,
          height: '100%',
          left: '0',
          position: 'absolute',
          top: 'calc(100% + 22px)',
          transition: 'top 1s ease',
          width: '100%',
        }}
      >
        <Box
          className="wave"
          sx={{
            animation: 'wave 0.5s linear infinite',
            backgroundImage: backgroundImage,
            backgroundSize: 'contain',
            content: '""',
            height: '22px',
            left: '0',
            position: 'absolute',
            top: '-22px',
            width: '100%',
          }}
        />
      </Box>
      <style jsx global>{`
        @keyframes wave {
          to {
            background-position-x: 118px;
          }
        }
      `}</style>
    </Button>
  );
};

export default LiquidButton;