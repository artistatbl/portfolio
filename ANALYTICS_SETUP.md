# One Dollar Stats Analytics Setup

This document outlines the implementation of One Dollar Stats analytics for the portfolio website.

## Setup Complete ✅

The analytics tracking has been successfully integrated into your portfolio website with the following components:

### 1. Analytics Script Installation

**Location**: `src/app/layout.tsx`

The One Dollar Stats script is loaded in the root layout:

```html
<script
  defer
  src="https://assets.onedollarstats.com/stonks.js"
></script>
```

### 2. Event Tracking Implementation

The following interactive elements now have event tracking:

#### Theme Toggle (`src/components/theme-toggle.tsx`)
- **Event**: `Theme Toggle`
- **Properties**: `theme=light|dark` (tracks which theme user is switching to)
- **Purpose**: Monitor user theme preferences

#### Navigation Links (`src/components/sidebar.tsx`)
- **Event**: `Navigation Click`
- **Properties**: 
  - `page=about|blog|projects|bookmarks`
  - `device=mobile|desktop`
- **Purpose**: Track navigation patterns and device usage

#### Social Media Links
- **Event**: `Social Link Click`
- **Properties**: 
  - `platform=twitter|github`
  - `source=sidebar|made_by_button`
- **Purpose**: Monitor social media engagement

#### External Links (`src/app/page.tsx`)
- **Event**: `External Link Click`
- **Properties**: 
  - `destination=mantlz`
  - `source=homepage`
- **Purpose**: Track outbound link clicks

## Next Steps

### 1. Add Your Domain to One Dollar Stats

1. Visit [onedollarstats.com](https://onedollarstats.com)
2. Login to your account
3. Add your website domain
4. Deploy your website with the analytics code

### 2. Verify Tracking

1. Deploy your website
2. Visit your live site
3. Navigate around and interact with tracked elements
4. Check your One Dollar Stats dashboard to confirm events are being recorded

### 3. Additional Tracking Opportunities

Consider adding event tracking to:

- **Blog post interactions**: Reading time, scroll depth
- **Project page engagement**: Project link clicks, demo interactions
- **Contact form submissions**: If you add contact forms
- **RSS feed subscriptions**: Track RSS link clicks

## Event Tracking Syntax Reference

One Dollar Stats uses HTML data attributes for event tracking:

```html
<!-- Basic event -->
<button data-s:event="Button Click">Click me</button>

<!-- Event with properties -->
<button 
  data-s:event="Navigation Click"
  data-s:event-props="page=about;device=mobile"
>
  About
</button>

<!-- Event with custom path -->
<button 
  data-s:event="Custom Event"
  data-s:event-path="/custom/path"
>
  Custom
</button>
```

### Property Syntax Rules

- Separate properties with `;`
- Use `=` for key-value pairs
- Example: `"theme=dark;lang=en;logged_in=true"`
- Whitespace around separators is automatically trimmed
- Don't use `;` or `=` in property keys or values

## Analytics Dashboard

Once set up, you'll be able to track:

- **Page views**: Automatic tracking of all page visits
- **User interactions**: All the custom events we've implemented
- **User behavior**: Navigation patterns, theme preferences, social engagement
- **Traffic sources**: Where your visitors are coming from
- **Device types**: Mobile vs desktop usage patterns

## Support

If you need help with One Dollar Stats:

- **Documentation**: [docs.onedollarstats.com](https://docs.onedollarstats.com)
- **Discord**: Available through their website
- **Email**: help@drizzle.team

---

**Implementation Status**: ✅ Complete
**Next Action**: Add your domain to One Dollar Stats and deploy