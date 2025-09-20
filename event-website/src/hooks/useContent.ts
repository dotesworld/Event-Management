import { useEffect, useState } from 'react';
import content, { WebsiteContent, getContentByPath } from '../utils/contentLoader';

export const useContent = () => {
  const [websiteContent, setWebsiteContent] = useState<WebsiteContent>(content);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateContent = async (updates: Partial<WebsiteContent>) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      });

      if (!res.ok) throw new Error('Failed to update content');

      const updatedContent: WebsiteContent = await res.json();
      setWebsiteContent(updatedContent);
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating content');
    } finally {
      setLoading(false);
    }
  };

  const getContentByPathHook = (path: string) => getContentByPath(path);

  const refreshContent = async () => {
    try {
      const newContent = await import('../data/content.json');
      setWebsiteContent(newContent.default as WebsiteContent);
    } catch (err) {
      console.error('Failed to refresh content:', err);
    }
  };

  return {
    content: websiteContent,
    loading,
    error,
    updateContent,
    getContentByPath: getContentByPathHook,
    refreshContent,
  };
};

export const useEventData = () => {
  const { content } = useContent();
  return content.event;
};

export const useHeroData = () => {
  const { content } = useContent();
  return content.hero;
};

export const useAboutData = () => {
  const { content } = useContent();
  return content.about;
};

export const useSpeakersData = () => {
  const { content } = useContent();
  return content.speakers;
};

export const useScheduleData = () => {
  const { content } = useContent();
  return content.schedule;
};

export const useSponsorsData = () => {
  const { content } = useContent();
  return content.sponsors;
};

export const useVenueData = () => {
  const { content } = useContent();
  return content.venue;
};

export const useRegistrationData = () => {
  const { content } = useContent();
  return content.registration;
};

export const useFooterData = () => {
  const { content } = useContent();
  return content.footer;
};

export const useThemeData = () => {
  const { content } = useContent();
  return content.theme;
};

export const useSEOData = () => {
  const { content } = useContent();
  return content.seo;
};