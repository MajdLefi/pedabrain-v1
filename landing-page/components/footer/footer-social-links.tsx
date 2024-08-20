import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Box, Typography } from '@mui/material'
import { SocialLink } from '@/interfaces/social-link'
import { socialLinks } from '@/data/social-link'

interface SocialLinkItemProps {
  item: SocialLink
}

const SocialLinkItem: React.FC<SocialLinkItemProps> = ({ item }) => (
  <Link href={item.link} legacyBehavior>
    <Box sx={{ mr: '20px', cursor: 'pointer', display: "flex", justifyContent: "center", alignItems: "center", width: "40px", height: "40px", borderRadius: "50%", color: "white", backgroundColor: "white" }}>
      <Image src={item.icon} width={20} height={20} priority alt={`logo-${item.name}`} />
    </Box>
  </Link>
)

export default function FooterSocialLinks() {
  return (
    <Box>
      <Box className="flex text-sm">
        {socialLinks.map((item, index) => (
          <SocialLinkItem key={index} item={item} />
        ))}
      </Box>
    </Box>
  )
}

