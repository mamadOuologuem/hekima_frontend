'use client';

import { useEffect, createContext, PropsWithChildren, useContext } from 'react';
import * as amplitude from '@amplitude/analytics-browser';
import { SendIdentifyEvent, TrackEvent } from './types';

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

type TrackingContextType = {
  trackEvent: TrackEvent;
  sendIdentifyEvent: SendIdentifyEvent;
};

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

export const TrackingContextProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    if (!AMPLITUDE_API_KEY) {
      return;
    }

    amplitude.init(AMPLITUDE_API_KEY, {
      autocapture: {
        formInteractions: false
      }
    });
  }, []);

  const trackEvent: TrackEvent = (event, properties) => {
    if (!AMPLITUDE_API_KEY) {
      console.log('Local Tracking:', event, properties);
      return;
    }

    amplitude.track(event, properties);
  };

  const sendIdentifyEvent: SendIdentifyEvent = (properties) => {
    if (!AMPLITUDE_API_KEY) {
      return;
    }

    const identifyEvent = new amplitude.Identify();

    Object.entries(properties).forEach(([key, value]) => {
      identifyEvent.set(key, value);
    });
    amplitude.identify(identifyEvent);
  };

  return <TrackingContext.Provider value={{ trackEvent, sendIdentifyEvent }}>{children}</TrackingContext.Provider>;
};

export const useTrackingContext = (): TrackingContextType => {
  const context = useContext(TrackingContext);

  if (context === undefined) {
    throw new Error('useTrackingContext must be used within a TrackingContextProvider');
  }

  return context;
};
