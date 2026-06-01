import type { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src="/images/logo-smpn1tejakula.png"
            alt="Logo Sekolah"
            className="size-full object-contain"
            {...props}
        />
    );
}
