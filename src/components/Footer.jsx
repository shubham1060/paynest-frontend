import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import MovingOutlinedIcon from "@mui/icons-material/MovingOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate } from "react-router-dom";

const Footer = ({ value, onChange }) => {
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    onChange(newValue);
    navigate(`/${newValue}`); // Navigate to respective page
  };

  return (
    <BottomNavigation
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "white",
        zIndex: 1000,
      }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Invest"
        value="invest"
        icon={<MovingOutlinedIcon />}
        disableRipple // Removes click ripple effect
        sx={{
          "&.Mui-selected": { color: "#156fb2" },
          outline: "none",
          "&:focus": { outline: "none" },
        }}
      />
      <BottomNavigationAction
        label="PrizeTask"
        value="prize-task"
        icon={<EmojiEventsOutlinedIcon />}
        disableRipple
        sx={{
          "&.Mui-selected": { color: "#156fb2" },
          outline: "none",
          "&:focus": { outline: "none" },
        }}
      />
      <BottomNavigationAction
        label="Account"
        value="account"
        icon={<AccountCircleOutlinedIcon />}
        disableRipple
        sx={{
          "&.Mui-selected": { color: "#156fb2" },
          outline: "none",
          "&:focus": { outline: "none" },
        }}
      />
    </BottomNavigation>
  );
};

export default Footer;
