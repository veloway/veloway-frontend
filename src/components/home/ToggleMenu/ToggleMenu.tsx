"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FiMenu } from "react-icons/fi"; // Icono de menú
import Link from "next/link";

export default function ToggleMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* Botón de menú */}
      <Button
        id="menu-button"
        aria-controls={open ? "menu-hamburguesa" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "white" }} // Color blanco para el icono
      >
        <FiMenu size={28} />
      </Button>

      {/* Menú desplegable */}
      <Menu
        id="menu-hamburguesa"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "menu-button",
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "white", 
            borderRadius: "10px",
            maxWidth: "150px",  
            overflow: "hidden",
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link href="#" style={{ textDecoration: "none", color: "black" }}>
            Inicio
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link
            href="/client/dashboard"
            style={{ textDecoration: "none", color: "black" }}
          >
            Realizar Envío
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link
            href="/driver/dashboard"
            style={{ textDecoration: "none", color: "black" }}
          >
            Conductores
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="#" style={{ textDecoration: "none", color: "black" }}>
            API
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="#" style={{ textDecoration: "none", color: "black" }}>
            Iniciar Sesión
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="#" style={{ textDecoration: "none", color: "black" }}>
            Registrarse
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
