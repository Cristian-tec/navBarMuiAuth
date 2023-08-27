import * as React from "react";
import { useEffect, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import BiotechIcon from "@mui/icons-material/Biotech";
import LoginIcon from "@mui/icons-material/Login";

import { useAuth0 } from "@auth0/auth0-react";
import Cookie from "universal-cookie";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Login"];
const settings2 = ["Account", "Dashboard", "Logout"];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [usuario, setUsuario] = useState({ nickA: "", picture: "" });

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  //############################
  const { loginWithRedirect, isAuthenticated, logout, user, isLoading } =
    useAuth0();

  const handleCloseUserMenu = (e) => {
    e.preventDefault();
    setAnchorElUser(null);
    //console.log(e.target.id);
    if (e.target.id == "Login") {
      loginWithRedirect();
    }
    if (e.target.id == "Logout") {
      setTimeout(() => {
        eraseCookie();
      }, 500);
    }
  };

  const readCookie = () => {
    const cookie = new Cookie();
    const nickR = cookie.get("nick");
    const pictureR = cookie.get("picture");
    const userR = { nick: nickR, picture: pictureR };
    //console.log(userR);
    return userR;
  };

  const eraseCookie = () => {
    const cookie = new Cookie();
    cookie.remove("nick", { path: "/" });
    cookie.remove("picture", { path: "/" });
   // console.log("borrando...");
    logout();
  };

  const saveCokkie = (nick, picture) => {
    const cookie = new Cookie();
    cookie.set("nick", nick, { path: "/" });
    cookie.set("picture", picture, { path: "/" });
  };

  const cookie2 = new Cookie();
  const logueo = () => {
    if (isAuthenticated || readCookie().nick) {
      if (!cookie2.get("nick")) {
        saveCokkie(user.nickname, user.picture);
        //console.log("generando koki");
      }

      return settings2.map((setting) => (
        <MenuItem key={setting} onClick={handleCloseUserMenu}>
          <Typography id={setting} textAlign="center">
            {setting}
          </Typography>
        </MenuItem>
      ));
    } else {
      return settings.map((setting) => (
        <MenuItem key={setting} onClick={handleCloseUserMenu}>
          <Typography id={setting} textAlign="center">
            {setting}
          </Typography>
        </MenuItem>
      ));
    }
  };
  const [flag, setFlag] = useState(false);

  useEffect(() => {
 
  }, []);


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BiotechIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            IMAGEN
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((elem) => (
                <MenuItem key={elem} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{elem}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            IMAGEN
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {/* {isAuthenticated ? user.nickname : <></>} */}
            {readCookie().nick ? readCookie().nick : <></>}
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, marginLeft: 2 }}
              >
                <Avatar
                  sx={{ backgroundColor: "green" }}
                  alt="Remy Sharp"
                  /* src={user?.picture} */
                  src={readCookie().picture ? readCookie().picture : readCookie().picture}
                >
                  <LoginIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {logueo()}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
