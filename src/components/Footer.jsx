import React from "react";
import EmailIcon from '@mui/icons-material/Email';
import Link from "@mui/material/Link";
import FacebookIcon from '@mui/icons-material/Facebook';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Footer() {
  let year = new Date().getFullYear();

  return (
    <footer>
      <Link href="/contact/0" underline="hover" color="inherit"><EmailIcon fontSize="tiny" />Contact us | Made with 🧡 </Link>
      <p>Copyright ⓒ {year} | </p>
      <Link href="https://www.facebook.com/tony.weiliang" underline="hover" color="inherit"><FacebookIcon /></Link>
    </footer>
  );
}
export default Footer;
