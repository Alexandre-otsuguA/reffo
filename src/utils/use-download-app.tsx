// @ts-nocheck
import { useEvent } from 'react-use';
import useToast from '@utils/use-toast';

const useDownloadApp = () => {
  const toast = useToast();
  let deferredPrompt: Event;

  useEvent('beforeinstallprompt', ev => {
    // Impede que o mini-infobar apareça em mobile
    ev.preventDefault();
    // Guarda evento para que possa ser disparado depois.
    deferredPrompt = ev;
    // Opcionalmente, enviar eventos de analytics que promo de instalação PWA foi mostrado.
    console.log(`'beforeinstallprompt' event was fired.`);
  });

  useEvent('appinstalled', () => {
    // Limpar o deferredPrompt para que seja coletado
    deferredPrompt = null;
    // Opcionalmente, enviar evento de analytics para indicar instalação com sucesso
    console.log('PWA was installed');
    toast('Download finalizado.', { status: 'success' });
  });

  async function downloadApp() {
    try {
      // Mostra prompt de instalação
      deferredPrompt.prompt();
      // Espera usuário responder ao prompt
      const { outcome } = await deferredPrompt.userChoice;
      // Opcionalmente, enviar evento analytics com resultado da escolha do usuário
      console.log(`User response to the install prompt: ${outcome}`);
      // Usamos o prompt e não podemos usar de novo; jogue fora
      deferredPrompt = null;
    } catch (error) {
      toast('Desculpe, mas não pudemos concluir o download.', { status: 'error' });
    }
  }

  return { downloadApp };
};

export default useDownloadApp;
