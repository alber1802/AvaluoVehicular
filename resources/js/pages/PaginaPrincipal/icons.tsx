import React from 'react';

interface IconProps {
    className?: string;
    style?: React.CSSProperties;
}

// Ícono de Carro para el logo
export const CarIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        width="1em"
        height="1em"
    >
        <path d="M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zm288 32c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32z" />
    </svg>
);

// Ícono de Carro (vista lateral) para servicios
export const CarSideIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
        fill="currentColor"
        width="1em"
        height="1em"
    >
        <path d="M171.3 96H224v96H111.3l30.4-75.9C146.5 104 158.2 96 171.3 96zM272 192V96h81.2c9.7 0 18.9 4.4 25 12l67.2 84H272zm256.2 1L428.2 68c-18.2-22.8-45.8-36-75-36H171.3c-39.3 0-74.6 23.9-89.1 60.3L40.6 196.4C16.8 205.8 0 228.9 0 256V368c0 17.7 14.3 32 32 32H65.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H385.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H608c17.7 0 32-14.3 32-32V320c0-65.2-48.8-119-111.8-127zM434.7 368a48 48 0 1 1 90.5 32 48 48 0 1 1 -90.5-32zM160 336a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
    </svg>
);

// Ícono de Balanza para valuación
export const BalanceScaleIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
        fill="currentColor"
        width="1em"
        height="1em"
    >
        <path d="M384 32H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H398.4c-5.2 25.8-22.9 47.1-46.4 57.3V448H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H320 128c-17.7 0-32-14.3-32-32s14.3-32 32-32H288V153.3c-23.5-10.3-41.2-31.6-46.4-57.3H128c-17.7 0-32-14.3-32-32s14.3-32 32-32H256c14.6-19.4 37.8-32 64-32s49.4 12.6 64 32zm55.6 288H584.4L512 195.8 439.6 320zM512 416c-62.9 0-115.2-34-126-78.9c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C627.2 382 574.9 416 512 416zM126.8 195.8L54.4 320H199.3L126.8 195.8zM.9 337.1c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C242 382 189.7 416 126.8 416S11.7 382 .9 337.1z" />
    </svg>
);

// Ícono de Martillo (gavel) para legal
export const GavelIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        width="1em"
        height="1em"
    >
        <path d="M318.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-120 120c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l4-4L256 294.9c0 16.5 6.6 32.3 18.2 44L357.9 422.6c11.7 11.7 27.6 18.2 44.1 18.2c34.3 0 62-27.7 62-62c0-16.5-6.6-32.3-18.2-44l-83.7-83.7c-11.7-11.7-27.6-18.2-44.1-18.2H250L338.7 145.3l4-4c12.5-12.5 12.5-32.8 0-45.3l-24-24zM128 131.3l-96 96c-14.1 14.1-21.9 33.3-21.9 53.3c0 41.6 33.8 75.4 75.4 75.4c20 0 39.2-7.9 53.3-21.9l96-96c-34.6-17.3-62.2-44.8-79.6-79.6l-27.2-27.2z" />
    </svg>
);

// Ícono de Play
export const PlayIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        fill="currentColor"
        width="1em"
        height="1em"
    >
        <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.8 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
    </svg>
);

// Ícono de Pausa
export const PauseIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        fill="currentColor"
        width="1em"
        height="1em"
    >
        <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
    </svg>
);

// Ícono de Información
export const InfoCircleIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        width="1em"
        height="1em"
    >
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
    </svg>
);

// Ícono de Menú (barras)
export const BarsIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="currentColor"
        width="1em"
        height="1em"
    >
        <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
    </svg>
);

// Ícono de X (cerrar)
export const TimesIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        fill="currentColor"
        width="1em"
        height="1em"
    >
        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
    </svg>
);

// Ícono de Ubicación
export const MapMarkerIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        fill="currentColor"
        width="1em"
        height="1em"
    >
        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
    </svg>
);

// Ícono de Teléfono
export const PhoneIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        width="1em"
        height="1em"
    >
        <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
    </svg>
);

// Ícono de Correo
export const EnvelopeIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        width="1em"
        height="1em"
    >
        <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
    </svg>
);

// Ícono de Facebook
export const FacebookIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        fill="currentColor"
        width="1em"
        height="1em"
    >
        <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
    </svg>
);

// Ícono de Twitter/X
export const TwitterIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        width="1em"
        height="1em"
    >
        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
    </svg>
);

// Ícono de Instagram
export const InstagramIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="currentColor"
        width="1em"
        height="1em"
    >
        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
);

// Ícono de LinkedIn
export const LinkedInIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="currentColor"
        width="1em"
        height="1em"
    >
        <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
    </svg>
);
