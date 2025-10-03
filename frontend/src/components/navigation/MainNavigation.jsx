import * as React from "react";
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
import { useNavigate, useLocation } from "react-router-dom"; // ✅ import
import { alpha } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeCredentials } from "../../services/auth";
// Map your pages to routes
const pages = [
  { label: "Products", path: "/" },
  { label: "My Products", path: "/my-products" },
  { label: "Login", path: "/login" },
  { label: "Signup", path: "/signup" },
];

const settings = ["Logout"];

function MainNavigation() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const isAuth = useSelector((state) => state.authSlice.isAuth);
  const navigate = useNavigate(); // ✅ hook for navigation
  const location = useLocation(); // ✅ hook for active route detection
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  const handleCloseNavMenu = (path) => {
    setAnchorElNav(null);
    if (path) navigate(path); // ✅ navigate to route
  };

  const handleCloseUserMenu = (path) => {
  setAnchorElUser(null);

  if (path === "/logout") {
    dispatch(removeCredentials()); // remove credentials
    navigate("/"); // redirect to home
  } else if (path) {
    navigate(path); // navigate normally
  }
};
  const filteredPages = pages.filter((page) => {
    if (isAuth) {
      // If authenticated, hide Login & Signup
      return page.label !== "Login" && page.label !== "Signup";
    }else {
        return page.label !== "Sold" && page.label !== "Purchased" && page.label !== "My Products";
    }
  });

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            MyStore
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu()}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => {
                const isActive = location.pathname === page.path;
                return (
                  <MenuItem
                    key={page.label}
                    onClick={() => handleCloseNavMenu(page.path)}
                    sx={{
                      fontWeight: isActive ? "bold" : "normal",
                      color: isActive ? "primary.main" : "inherit",
                    }}
                  >
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {filteredPages.map((page) => {
              const isActive = location.pathname === page.path;
              return (
                <Button
                  key={page.label}
                  onClick={() => handleCloseNavMenu(page.path)}
                  disableRipple
                  disableFocusRipple
                  sx={{
                    my: 2,
                    color: isActive ? "white" : alpha("#ffffff", 0.6),
                    display: "block",
                    fontWeight: isActive ? "bold" : "normal",
                    outline: "none", // removes browser default outline
                    border: "none", // removes any border
                    "&:focus": {
                      outline: "none", // removes focus outline
                      boxShadow: "none", // removes MUI focus shadow
                    },
                  }}
                >
                  {page.label}
                </Button>
              );
            })}
          </Box>

          {/* Avatar menu */}
          {isAuth && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => {
                  const path = "/" + setting.toLowerCase().replace(/\s+/g, "-");
                  const isActive = location.pathname === path;
                  return (
                    <MenuItem
                      key={setting}
                      onClick={() => handleCloseUserMenu(path)}
                      sx={{
                        fontWeight: isActive ? "bold" : "normal",
                        color: isActive ? "primary.main" : "inherit",
                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  );
                })}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MainNavigation;
