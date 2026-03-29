'use client';

import { createContext, useContext } from 'react';

interface PreviewContextValue {
  isPreview: true;
  userId: string;
}

const PreviewContext = createContext<PreviewContextValue>({
  isPreview: true,
  userId: 'preview-user-123',
});

export function usePreviewAuth() {
  return useContext(PreviewContext);
}

export default function PreviewProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PreviewContext.Provider value={{ isPreview: true, userId: 'preview-user-123' }}>
      {children}
    </PreviewContext.Provider>
  );
}
