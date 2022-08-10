import { useEffect } from 'react';
import router from 'next/router';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

export const NProgress = () => {
  useEffect(() => {
    router.events.on('routeChangeStart', nprogress.start);
    router.events.on('routeChangeError', nprogress.done);
    router.events.on('routeChangeComplete', nprogress.done);

    return () => {
      router.events.off('routeChangeStart', nprogress.start);
      router.events.off('routeChangeError', nprogress.done);
      router.events.off('routeChangeComplete', nprogress.done);
    };
  }, []);

  return (
    <style jsx global>
      {`
        #nprogress .bar {
          background: rgb(var(--color-primary));
        }
        #nprogress .peg {
          box-shadow: 0 0 10px rgb(var(--color-primary)),
            0 0 5px rgb(var(--color-primary));
        }
        #nprogress .spinner {
          display: none;
        }

        @media (prefers-reduced-motion) {
          #nprogress .bar {
            display: none;
          }
        }
      `}
    </style>
  );
};

// -- nprogress.css --
// /* Make clicks pass-through */
// #nprogress {
//   pointer-events: none;
// }

// #nprogress .bar {
//   background: #29d;

//   position: fixed;
//   z-index: 1031;
//   top: 0;
//   left: 0;

//   width: 100%;
//   height: 2px;
// }

// /* Fancy blur effect */
// #nprogress .peg {
//   display: block;
//   position: absolute;
//   right: 0px;
//   width: 100px;
//   height: 100%;
//   box-shadow: 0 0 10px #29d, 0 0 5px #29d;
//   opacity: 1.0;

//   -webkit-transform: rotate(3deg) translate(0px, -4px);
//       -ms-transform: rotate(3deg) translate(0px, -4px);
//           transform: rotate(3deg) translate(0px, -4px);
// }

// /* Remove these to get rid of the spinner */
// #nprogress .spinner {
//   display: block;
//   position: fixed;
//   z-index: 1031;
//   top: 15px;
//   right: 15px;
// }

// #nprogress .spinner-icon {
//   width: 18px;
//   height: 18px;
//   box-sizing: border-box;

//   border: solid 2px transparent;
//   border-top-color: #29d;
//   border-left-color: #29d;
//   border-radius: 50%;

//   -webkit-animation: nprogress-spinner 400ms linear infinite;
//           animation: nprogress-spinner 400ms linear infinite;
// }

// .nprogress-custom-parent {
//   overflow: hidden;
//   position: relative;
// }

// .nprogress-custom-parent #nprogress .spinner,
// .nprogress-custom-parent #nprogress .bar {
//   position: absolute;
// }

// @-webkit-keyframes nprogress-spinner {
//   0%   { -webkit-transform: rotate(0deg); }
//   100% { -webkit-transform: rotate(360deg); }
// }
// @keyframes nprogress-spinner {
//   0%   { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// }
