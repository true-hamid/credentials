import { ReactNode } from 'react';
import {ThemeParams} from '@types';

export interface ProviderProps {
  children: ReactNode;
  value: ThemeParams;
}
