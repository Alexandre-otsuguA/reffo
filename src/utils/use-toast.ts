import { toast, ToastOptions } from 'react-toastify';
import useWindowSize from './use-window-size';

type Options = Omit<ToastOptions, 'position' | 'progressClassName'> & {
  status?: 'info' | 'success' | 'warning' | 'error';
};

export default function useToast() {
  const { width } = useWindowSize();

  return (content: string, options?: Options) =>
    (options?.status ? toast[options.status] : toast)(content, {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',

      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,

      ...options,
    });
}
