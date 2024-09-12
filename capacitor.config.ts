import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.notes.app',
  appName: 'Notes',
  webDir: 'build',
  android: {
    backgroundColor: '#FFFFFF', 
  },
  plugins: {
    StatusBar: {
      style: 'DARK' 
    },
    /*"SplashScreen": {
      "launchShowDuration": 0,
      "backgroundColor": "#ffffffff",  // Optional: set a background color
      "androidScaleType": "CENTER_CROP",
      "showSpinner": false
    }*/
  }
};

export default config;
