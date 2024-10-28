import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ryannickel.ngtodo',
  appName: 'ngtodo',
  webDir: 'dist/ng-todo/browser',
  server: {
    androidScheme: 'https',
    // url: "https://login.xello.world",
    cleartext: true
  },
  ios: {
    contentInset: 'always',
  },
  plugins: {
    LiveUpdate: {
      autoDeleteBundles: true,
      enabled: true,
      readyTimeout: 10000,
      resetOnUpdate: true
    }
  }
};

export default config;
