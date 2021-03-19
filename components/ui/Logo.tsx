import React from 'react';
import { Image, Link as LinkUI } from "@chakra-ui/react"
import Link from 'next/link'

type LogoProps = {
    w: string,
    color: Array<string>
}

const Logo: React.FC<LogoProps> = (props) => {
    return (
      <Link href="/" passHref>
        <LinkUI>
          <Image src="/vercel.svg" {...props}/>
        </LinkUI>
      </Link>
    );
};

export default Logo;
