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
    <Box sx={{ mr: '15px', cursor: 'pointer' }}>
      <Image src={item.icon} width={24.5} height={24.5} priority alt={`logo-${item.name}`} />
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

