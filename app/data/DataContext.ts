import { createContext, useState } from 'react';
import { ChatMessage } from '@prisma/client';

export const DataContext = createContext<ChatMessage[] | []>({});
