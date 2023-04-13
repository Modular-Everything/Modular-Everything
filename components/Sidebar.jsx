import Link from "next/link";

import { classNames } from "../helpers/classNames";

export function Sidebar({ className }) {
  return (
    <div
      className={classNames(
        className,
        "flex h-screen flex-col justify-between"
      )}
    >
      <div className="sidebar__logo">
        <Link href="/">
          <svg
            width="137"
            height="371"
            viewBox="0 0 137 371"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full object-contain"
          >
            <path
              d="M16.172 370.921L16.1721 120.557L9.04515 120.557L9.04514 370.921L16.172 370.921Z"
              fill="#B2B2B2"
            />
            <path
              d="M136.321 202.163L119.871 202.163L119.871 153.695L136.321 153.695L136.321 0L79.7232 -2.47399e-06L79.7232 287.225L136.321 287.225L136.321 202.163Z"
              fill="#9FF1FF"
            />
            <path
              d="M9.04504 295.636L9.04504 227.394L0.0387821 227.394L0.0387791 295.636L9.04504 295.636Z"
              fill="#2B2B2B"
            />
            <path
              d="M72.5942 202.257L56.2702 202.257L56.2702 35.6769L72.5942 35.6769L72.5942 0L16.1722 -2.46629e-06L16.1722 370.921L72.5942 370.921L72.5942 202.257Z"
              fill="#9FF1FF"
            />
            <path
              d="M136.321 0.080658L136.321 19.9041L86.9882 29.6924L86.9882 31.1617L136.321 40.9529L136.321 60.7764L79.7262 60.7764L79.7262 50.4062L128.472 50.4062L128.472 48.937L79.7262 39.2397L79.7262 21.6085L128.472 11.9112L128.472 10.442L79.7262 10.442L79.7262 0.0806555L136.321 0.080658ZM99.1306 65.099L100.423 65.099C113.343 65.099 120.961 74.1615 120.961 86.136C120.961 98.1106 113.358 107.173 100.423 107.173L99.1306 107.173C86.1924 107.173 78.5927 98.1106 78.5927 86.136C78.5927 74.1615 86.1865 65.099 99.1306 65.099ZM99.3714 96.9793L100.179 96.9793C107.699 96.9793 111.904 92.448 111.904 86.136C111.904 79.824 107.699 75.2957 100.179 75.2957L99.3714 75.2957C91.851 75.2957 87.6489 79.9063 87.6489 86.136C87.6489 92.3658 91.851 96.9793 99.3714 96.9793ZM99.1306 111.463L100.423 111.463C113.519 111.463 120.961 119.876 120.961 129.585C120.961 136.87 118.048 140.349 115.22 142.048L115.22 143.502L136.321 143.502L136.321 153.699L79.7262 153.699L79.7262 143.664L84.5773 143.664L84.5773 142.195C81.5057 140.335 78.5956 136.855 78.5956 129.559C78.5927 119.959 86.0308 111.463 99.1306 111.463ZM99.3714 143.664L100.179 143.664C107.943 143.664 112.066 138.962 112.066 132.662C112.066 126.362 107.955 121.657 100.179 121.657L99.3714 121.657C91.6102 121.657 87.4844 126.432 87.4844 132.662C87.4844 138.892 91.6102 143.664 99.3714 143.664ZM95.8946 158.389L119.827 158.389L119.827 168.586L96.7021 168.586C90.6383 168.586 87.6489 171.66 87.6489 177.16C87.6489 183.393 92.0125 187.034 99.4536 187.034L119.827 187.034L119.827 197.228L79.7262 197.228L79.7262 187.196L84.9825 187.196L84.9825 185.726C82.234 184.433 79.0802 181.195 79.0802 173.996C79.0772 164.61 85.9487 158.389 95.8946 158.389ZM136.321 202.173L136.321 212.367L79.7262 212.367L79.7262 202.165L136.321 202.173ZM91.4487 216.484C99.6944 216.484 103.979 222.949 103.979 232.02L103.979 243.025L106.246 243.025C109.963 243.025 112.706 240.76 112.706 235.579C112.706 230.483 110.119 228.232 106.481 227.489L109.64 218.092C115.704 220.034 120.961 225.291 120.961 235.723C120.961 246.243 115.543 252.878 105.518 252.878L90.559 252.878C88.9409 252.878 88.1334 253.686 88.1334 255.144L88.1334 258.376L79.7262 258.376L79.7262 251.591C79.7262 247.627 81.8287 244.715 85.0618 244.715L85.144 244.715L85.144 243.178C83.1237 242.449 78.5956 239.946 78.5956 231.527C78.5927 222.949 83.2001 216.475 91.4487 216.475L91.4487 216.484ZM95.5598 243.025L96.3674 243.025L96.3674 232.74C96.3674 228.938 94.6701 226.672 91.76 226.672C88.8499 226.672 86.8267 228.938 86.8267 233.304C86.8384 238.97 90.2359 243.016 95.5833 243.016L95.5598 243.025ZM119.815 262.846L119.815 272.881L115.287 272.881L115.287 274.335C118.517 275.47 119.986 278.382 119.986 282.102L119.986 286.959L110.929 286.959L110.929 281.94C110.929 276.763 108.181 273.042 102.522 273.042L79.7262 273.042L79.7262 262.846L119.815 262.846ZM72.7696 0.0806552L72.7696 36.4893L63.0791 36.4893L63.0791 10.7593L49.5712 10.7593L49.5712 34.2236L39.8807 34.2236L39.8807 10.7593L25.8912 10.7593L25.8912 36.9771L16.2007 36.9771L16.2007 0.0806527L72.7696 0.0806552ZM56.2753 35.6812L56.2753 46.5215L23.6095 55.8278L23.6095 57.2971L56.2753 66.6035L56.2752 77.4438L16.1714 64.6611L16.1714 48.4638L56.2753 35.6812ZM35.7402 76.5799L36.7093 76.5799C49.3363 76.5799 57.4087 84.6726 57.4087 96.6472C57.4087 108.46 48.9986 116.147 36.7093 116.147L33.2325 116.147L33.2325 86.9383C27.7353 87.1792 23.9326 91.4666 23.9326 97.1321C23.9326 102.798 26.8456 105.143 29.9172 106.518L25.5506 114.852C21.2662 112.586 15.0408 107.799 15.0408 96.8088C15.0408 84.752 23.125 76.5799 35.7402 76.5799ZM40.8322 105.789C45.4425 105.304 48.514 101.825 48.514 96.5649C48.514 91.064 45.4425 87.7493 40.8322 87.0176L40.8322 105.789ZM56.2752 120.541L56.2752 130.573L51.7471 130.573L51.7471 132.042C54.9773 133.176 56.4456 136.088 56.4456 139.812L56.4456 144.666L47.3894 144.666L47.3894 139.632C47.3894 134.455 44.6408 130.731 38.9821 130.731L16.1802 130.731L16.1802 120.532L56.2752 120.541ZM8.89472 153.632L8.89471 175.483C8.89471 176.952 9.70226 177.748 11.3203 177.748L21.4277 177.748L21.4277 176.279C18.6791 174.983 15.5254 171.748 15.5254 164.545C15.5254 155.16 22.3968 148.93 32.3427 148.93L56.2752 148.93L56.2752 159.127L33.1503 159.127C27.0864 159.127 24.097 162.2 24.097 167.701C24.097 173.931 28.4606 177.572 35.9018 177.572L56.2752 177.572L56.2752 187.769L9.05624 187.769C3.5591 187.769 2.24692e-05 184.207 2.27025e-05 178.868L2.38057e-05 153.632L8.89472 153.632ZM25.2276 202.259L47.868 202.259L47.868 192.232L56.2752 192.232L56.2752 202.265L68.729 202.265L68.729 212.461L56.2752 212.461L56.2752 223.463L47.868 223.463L47.868 212.461L27.0188 212.461C25.4008 212.461 24.5933 213.269 24.5933 214.727L24.5933 222.499L16.1831 222.499L16.1831 211.171C16.1714 205.82 19.7304 202.259 25.2276 202.259ZM72.7696 227.098L72.7696 237.295L51.3331 237.295L51.3331 238.764C53.9202 240.06 56.9125 243.216 56.9125 250.336C56.9125 259.722 50.041 265.952 40.0951 265.952L16.1626 265.952L16.1626 255.758L39.2876 255.758C45.3514 255.758 48.3437 252.681 48.3437 247.18C48.3437 240.95 43.9772 237.31 36.539 237.31L16.1626 237.31L16.1626 227.113L72.7696 227.098ZM67.434 268.928C71.316 268.928 73.8943 271.758 73.8943 275.481C73.8943 279.205 71.3072 282.034 67.434 282.034C63.5607 282.034 60.9737 279.205 60.9737 275.481C60.9737 271.758 63.5519 268.928 67.434 268.928ZM56.2752 270.398L56.2752 280.594L16.1714 280.594L16.1714 270.398L56.2752 270.398ZM56.2752 285.528L56.2752 295.56L51.0218 295.56L51.0218 297.03C53.7704 298.326 56.9213 301.561 56.9213 308.763C56.9213 318.149 50.0498 324.379 40.1039 324.379L16.1714 324.379L16.1714 314.182L39.2963 314.182C45.3602 314.182 48.3525 311.108 48.3525 305.607C48.3525 299.378 43.9859 295.734 36.5478 295.734L16.1714 295.734L16.1714 285.54L56.2752 285.528ZM37.3553 328.613C49.9823 328.613 57.4087 336.947 57.4087 346.9C57.4087 354.182 54.1786 357.581 51.4241 359.359L51.4241 360.829L56.2752 360.829L56.2752 370.861L9.05623 370.861C3.5591 370.861 1.44658e-05 367.302 1.46993e-05 361.96L1.58745e-05 335.075L8.89471 335.075L8.89471 358.378C8.89471 359.847 9.70225 360.643 11.3203 360.643L21.7507 360.643L21.7507 359.174C19.0814 357.558 16.0099 354.24 16.0099 346.876C16.0099 337.006 23.448 328.59 36.0633 328.59L37.3553 328.613ZM36.304 360.817L37.1145 360.817C44.3912 360.817 48.514 356.115 48.514 349.812C48.514 343.509 44.4029 338.81 37.1145 338.81L36.304 338.81C29.0274 338.81 24.9045 343.582 24.9045 349.812C24.9045 356.042 29.0274 360.805 36.304 360.805L36.304 360.817Z"
              fill="#2B2B2B"
            />
          </svg>
        </Link>
      </div>

      <div className="sidebar__footer bg-blue text-2xl leading-none tracking-tight">
        Selected development works 18&ndash;23&#8599;
      </div>
    </div>
  );
}
