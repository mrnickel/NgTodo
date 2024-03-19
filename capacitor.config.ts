import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ryannickel.ngtodo',
  appName: 'ngtodo',
  webDir: 'dist/ng-todo/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
