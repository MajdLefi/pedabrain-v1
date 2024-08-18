import Image from "next/image";
import Link from "next/link";
import { Box, Typography } from "@mui/material";

export default function Logo() {
  return (
    <Box>
      <Link href={"/"}>
        <Box>
          <Image src="/assets/logo.png" width={180} height={180} alt="logo-gpp" />
        </Box>
      </Link>
    </Box>
  );
}
