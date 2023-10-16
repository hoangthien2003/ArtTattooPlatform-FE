import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Avatar, Container, Slide, Tab, Tabs } from "@mui/material";
import Logo from "../../assets/images/Logo.png";
import { Link } from "react-router-dom";
import { Close, CloseSharp } from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20rem",
    },
  },
}));

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-selected": {
      color: "#fff",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const [showSearchBar, setShowSearchBar] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#000",
          paddingLeft: {
            xs: 2,
            md: 6,
          },
          paddingRight: {
            xs: 0,
            md: 6,
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: {
              md: "space-between",
            },
            alignItems: "center",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{
              mr: 2,
              display: {
                xs: showSearchBar ? "none" : "flex",
                sm: "flex",
                md: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: {
                xs: showSearchBar ? "none" : "flex",
                sm: "flex",
                md: "flex",
              },
              alignItems: "center",
            }}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <Avatar src={Logo} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              VNINK
            </Typography>
          </Box>
          <Box
            sx={{
              position: "absolute",
              left: {
                md: "31%",
                xs: 0,
                sm: "30%",
              },
              width: {
                md: "30rem",
                xs: "18rem",
                sm: "25rem",
              },
            }}
          >
            <Slide
              in={showSearchBar}
              direction="down"
              mountOnEnter
              unmountOnExit
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Service..."
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Slide>
          </Box>
          <Box
            sx={{
              display: {
                xs: "none",
                md: showSearchBar ? "none" : "flex",
                borderBottom: 1,
                borderColor: "divider",
              },
            }}
          >
            <Tabs value={value} onChange={handleChange}>
              <StyledTab
                label="Home"
                onClick={() => {
                  window.location.href = "/";
                }}
              />
              <StyledTab label="Service" />
              <StyledTab label="Studio" />
            </Tabs>
          </Box>
          <Box
            sx={{
              flexGrow: {
                xs: 1,
              },
              display: {
                md: "none",
              },
            }}
          />
          <Box
            sx={{
              display: {
                md: "flex",
              },
            }}
          >
            <IconButton
              size="large"
              color="inherit"
              onClick={() => {
                setShowSearchBar(!showSearchBar);
              }}
              sx={{
                display: {
                  xs: showSearchBar ? "none" : "flex",
                  md: "flex",
                },
              }}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
              }}
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
              }}
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={() => {
                showSearchBar
                  ? setShowSearchBar(false)
                  : handleMobileMenuOpen();
              }}
              color="inherit"
            >
              {showSearchBar ? <Close /> : <MoreIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
