import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.essgee.dev.brewhause.demo',
  appName: 'brewhaus-demo',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      launchShowDuration: 3000,
      backgroundColor: '#ffffff',
      androidSplashResourceName: 'splash',
      showSpinner: true,
      androidSpinnerStyle: 'large',
    },
  },
};

export default config;
