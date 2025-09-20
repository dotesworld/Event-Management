# Dynamic Content System Guide

This guide explains how to use the new dynamic content system that allows you to manage all website content from a single JSON file.

## Overview

The dynamic content system stores all website content in a centralized JSON file (`src/data/websiteContent.json`) and provides utilities to access and update this content dynamically.

## File Structure

```
src/
├── data/
│   └── websiteContent.json          # Main content file
├── utils/
│   └── contentLoader.ts             # Content loading utilities
├── hooks/
│   └── useContent.ts                # React hooks for content access
├── components/
│   ├── HeroSectionDynamic.tsx       # Dynamic hero component example
│   └── ContentManager.tsx           # Content management UI
└── app/
    ├── api/
    │   └── content/
    │       └── route.ts              # API endpoints
    └── demo/
        └── page.tsx                  # Demo page
```

## Content Structure

The JSON file contains all website content organized into sections:

- **event**: Event details (name, dates, location, hashtag)
- **navigation**: Navigation menu items
- **hero**: Hero section content and styling
- **about**: About section content
- **speakers**: Speaker profiles and information
- **schedule**: Event schedule and sessions
- **sponsors**: Sponsorship packages and current sponsors
- **venue**: Venue information and features
- **registration**: Ticket types and pricing
- **footer**: Footer links and social media
- **theme**: Colors, typography, and animations
- **seo**: Meta tags and SEO settings

## Usage

### 1. Accessing Content in Components

Use the provided hooks to access content:

```tsx
import { useHeroData, useEventData } from '../hooks/useContent';

export default function MyComponent() {
  const heroData = useHeroData();
  const eventData = useEventData();

  return (
    <div>
      <h1>{heroData.headline.main}</h1>
      <p>{eventData.dates.display} • {eventData.location.display}</p>
    </div>
  );
}
```

### 2. Available Hooks

- `useContent()` - Main hook for accessing all content
- `useEventData()` - Event information
- `useNavigationData()` - Navigation menu
- `useHeroData()` - Hero section content
- `useAboutData()` - About section
- `useSpeakersData()` - Speaker information
- `useScheduleData()` - Event schedule
- `useSponsorsData()` - Sponsorship information
- `useVenueData()` - Venue details
- `useRegistrationData()` - Registration/ticket info
- `useFooterData()` - Footer content
- `useThemeData()` - Theme settings
- `useSEOData()` - SEO settings

### 3. Converting Existing Components

To convert a static component to use dynamic content:

1. Import the appropriate hook
2. Replace hardcoded text with content from the hook
3. Update styling classes to use theme colors if needed

Example conversion:

```tsx
// Before (static)
export default function HeroSection() {
  return (
    <div>
      <h1>#OMR26</h1>
      <p>March 15-17, 2025 • San Francisco, CA</p>
    </div>
  );
}

// After (dynamic)
import { useHeroData, useEventData } from '../hooks/useContent';

export default function HeroSection() {
  const heroData = useHeroData();
  const eventData = useEventData();

  return (
    <div>
      <h1>{heroData.headline.main}</h1>
      <p>{eventData.dates.display} • {eventData.location.display}</p>
    </div>
  );
}
```

## Content Management

### 1. Manual Editing

Edit the `src/data/websiteContent.json` file directly to change content.

### 2. Content Manager UI

Visit `/demo` to see the content manager interface. This provides:

- Real-time content editing
- Section-by-section management
- Preview of changes
- Save/cancel functionality

### 3. API Endpoints

Use the API endpoints to update content programmatically:

#### GET /api/content
Retrieve current content

#### POST /api/content
Update entire content
```bash
curl -X POST http://localhost:3000/api/content \
  -H "Content-Type: application/json" \
  -d '{"event": {"name": "New Event Name"}}'
```

#### PUT /api/content
Update specific section
```bash
curl -X PUT http://localhost:3000/api/content \
  -H "Content-Type: application/json" \
  -d '{"section": "event", "data": {"name": "New Event Name"}}'
```

## Demo Page

Visit `/demo` to see:

- Dynamic hero section
- Content overview
- Content manager widget
- Usage examples

## Theme Integration

The content system includes theme information that can be used for consistent styling:

```tsx
import { useThemeData } from '../hooks/useContent';

export default function MyComponent() {
  const theme = useThemeData();

  return (
    <div style={{ color: theme.colors.primary }}>
      Themed content
    </div>
  );
}
```

## TypeScript Support

All content is fully typed with TypeScript interfaces. The system provides:

- Type-safe content access
- IntelliSense support in IDEs
- Compile-time error checking
- Auto-completion for content properties

## Best Practices

1. **Use the hooks** - Always use the provided hooks instead of importing the JSON directly
2. **Type safety** - Take advantage of TypeScript support for better development experience
3. **Content validation** - Validate content structure before major updates
4. **Backup content** - Keep backups of your content file
5. **Staging environment** - Test content changes in a staging environment first

## Troubleshooting

### Content not updating
- Check if the JSON file is valid
- Ensure you're using the hooks correctly
- Refresh the page to reload content

### TypeScript errors
- Check that your content matches the expected structure
- Use the provided TypeScript interfaces
- Run `npm run type-check` to validate types

### API errors
- Ensure the JSON file exists and is readable
- Check file permissions
- Verify the API endpoint is correct

## Future Enhancements

Potential improvements for the content system:

- Database integration for multi-user editing
- Content versioning and rollback
- Real-time collaborative editing
- Content approval workflows
- Multi-language support
- Content scheduling
- A/B testing support

## Support

For questions or issues with the dynamic content system, please refer to the documentation or contact the development team.