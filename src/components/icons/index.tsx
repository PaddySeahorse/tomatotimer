import type { SVGProps } from 'react';

function Icon(props: SVGProps<SVGSVGElement>) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} />;
}

export function PlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <g clipPath="url(#play-icon-clip)">
        <path d="M2 3.5L21.5 12L2 20.5L5 12L2 3.5Z" fill="transparent" />
        <path d="M5 12L2 20.5L21.5 12L2 3.5L5 12ZM5 12H10" stroke="currentColor" strokeLinecap="square" strokeWidth="2" />
      </g>
      <defs>
        <clipPath id="play-icon-clip">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </Icon>
  );
}

export function PauseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M11 17 11 7H8V17H11ZM16 17 16 7H13L13 17H16Z" fill="currentColor" />
    </Icon>
  );
}

export function StopIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" fill="currentColor" />
      <path d="M8 8H16V16H8V8Z" fill="currentColor" />
    </Icon>
  );
}

export function RefreshIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M21.448 13C20.9483 17.7767 16.909 21.5 12 21.5C8.18227 21.5 4.89052 19.248 3.38065 16M2.5 20.5V15.5H5.5M2.55176 11C3.05145 6.22334 7.09079 2.5 11.9998 2.5C15.8175 2.5 19.1092 4.75197 20.6191 8M21.4998 3.5V8.5H18.4998" stroke="currentColor" strokeLinecap="square" strokeWidth="2" />
    </Icon>
  );
}

export function TaskIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M20 22V4H16V6H8V4H4V22H20Z" fill="transparent" />
      <path d="M16 6H8V2H16V6Z" fill="transparent" />
      <path d="M16 4H20V22H4V4H8M16 4V2H8V4M16 4V6H8V4" stroke="currentColor" strokeWidth="2" />
      <path d="M10 12H14M10 16H14" stroke="currentColor" strokeLinecap="square" strokeWidth="2" />
    </Icon>
  );
}

export function AlarmIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13C3 8.02944 7.02944 4 12 4C16.9706 4 21 8.02944 21 13Z" fill="transparent" />
      <path d="M22.5 6.5L18.5 2.5M1.5 6.5L5.5 2.5M21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13C3 8.02944 7.02944 4 12 4C16.9706 4 21 8.02944 21 13Z" stroke="currentColor" strokeLinecap="square" strokeWidth="2" />
      <path d="M12 8.5V13L15 16" stroke="currentColor" strokeLinecap="square" strokeWidth="2" />
    </Icon>
  );
}

export function LightModeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <g clipPath="url(#light-icon-clip)">
        <path d="M19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12Z" fill="transparent" stroke="currentColor" strokeLinecap="square" strokeWidth="2" />
        <path d="M19.7819 19.7762 19.7791 19.779 19.7764 19.7762 19.7791 19.7734 19.7819 19.7762ZM23.0029 11.9961V12H22.999V11.9961H23.0029ZM19.7791 4.2168 19.7819 4.21956 19.7791 4.22232 19.7764 4.21956 19.7791 4.2168ZM11.999.996094H12.0029V1H11.999V.996094ZM4.22525 4.21956 4.22249 4.22232 4.21973 4.21956 4.22249 4.2168 4.22525 4.21956ZM1.00293 11.9961V12H.999023V11.9961H1.00293ZM4.22249 19.7734 4.22525 19.7762 4.22249 19.779 4.21973 19.7762 4.22249 19.7734ZM11.999 22.9961H12.0029V23H11.999V22.9961Z" stroke="currentColor" strokeLinecap="square" strokeWidth="2" />
      </g>
      <defs>
        <clipPath id="light-icon-clip">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </Icon>
  );
}

export function DarkModeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M20.5387 14.8522C20.0408 14.9492 19.5263 15 19 15C14.5817 15 11 11.4183 11 7C11 5.54296 11.3194 4.17663 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C15.9737 21 19.3459 18.4248 20.5387 14.8522Z" fill="transparent" stroke="currentColor" strokeWidth="2" />
      <path d="M16.625 4 16.6692 4.08081 16.75 4.125 16.6692 4.16919 16.625 4.25 16.5808 4.16919 16.5 4.125 16.5808 4.08081 16.625 4ZM20.5 8.5 20.6768 8.82322 21 9 20.6768 9.17678 20.5 9.5 20.3232 9.17678 20 9 20.3232 8.82322 20.5 8.5Z" stroke="currentColor" strokeWidth="2" />
    </Icon>
  );
}

export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </Icon>
  );
}
