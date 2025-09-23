# EMU Alerts - Visual Appearance Guide

## Overview
This guide outlines the visual design system for the EMU (Emergency Management University) Alerts mobile application. The app follows a modern, clean design language optimized for emergency response professionals.

## Color Palette

### Primary Colors
- **Primary Blue**: `#2196F3` - Main brand color used for headers and primary actions
- **Light Blue Background**: `#E3F2FD` - Used for information sections
- **Deep Blue**: `#1976D2` - Used for text over light blue backgrounds

### Status Colors
- **Critical/Error**: `#FF3B30` - High priority incidents, errors, active alerts
- **Warning/Medium**: `#FF9500` - En-route status, medium priority
- **Caution/Low**: `#FFCC00` - Low priority incidents  
- **Success/Resolved**: `#34C759` - Resolved incidents, successful states
- **Information**: `#007AFF` - Action buttons, links, details

### Neutral Colors
- **Primary Text**: `#1C1C1E` - Main text content
- **Secondary Text**: `#3A3A3C` - Message content, descriptions
- **Tertiary Text**: `#8E8E93` - Metadata, timestamps, distances
- **Light Gray**: `#C7C7CC` - Empty states, disabled elements
- **Border Gray**: `#E5E5EA` - Card borders, dividers
- **Background**: `#F5F5F5` - Main app background
- **Card Background**: `#FFFFFF` - Card and component backgrounds

## Typography

### Font Weights
- **Bold/Header**: `fontWeight: '600'` - Screen titles, important labels
- **Semibold**: `fontWeight: '500'` - Status text, action labels
- **Regular**: `fontWeight: '400'` - Body text (default)
- **Heavy**: `fontWeight: '700'` - Status badges (ALL CAPS)

### Font Sizes
- **Large Title**: `fontSize: 24` - Error titles, main headings
- **Title**: `fontSize: 20` - Screen headers
- **Headline**: `fontSize: 16` - Address, primary content
- **Body**: `fontSize: 14` - Standard content, timestamps
- **Caption**: `fontSize: 12` - Metadata, distances, secondary info
- **Small Caption**: `fontSize: 10` - Status badges

### Special Typography
- **Monospace**: `fontFamily: 'Courier'` - Alert IDs, technical identifiers

## Layout & Spacing

### Card Design
- **Border Radius**: `16px` - Main cards and containers
- **Small Border Radius**: `8px` - Badges, buttons, indicators
- **Padding**: `16px` - Standard card padding
- **Small Padding**: `8px` - Buttons, small containers
- **Border Width**: `1px` - Standard card borders
- **Favorite Border**: `2px` - Emphasized favorite cards

### Shadows & Elevation
```javascript
// Standard Card Shadow
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.1,
shadowRadius: 8,
elevation: 3
```

```javascript
// Header Shadow
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.2,
shadowRadius: 4,
elevation: 4
```

### Spacing System
- **Micro**: `4px` - Icon spacing, small gaps
- **Small**: `8px` - Button padding, small margins
- **Medium**: `12px` - Section spacing within cards
- **Standard**: `16px` - Card padding, screen margins
- **Large**: `32px` - Error state buttons, large spacing
- **XL**: `60px` - Loading states
- **XXL**: `80px` - Empty states

## Components

### Priority Indicators
- **Size**: `8px x 8px`
- **Shape**: Circle (`borderRadius: 4`)
- **Colors**: Based on incident priority
- **Position**: Left-aligned with timestamp

### Status Badges
- **Padding**: `8px horizontal, 2px vertical`
- **Border Radius**: `8px`
- **Text**: `fontSize: 10, fontWeight: '700', color: '#FFFFFF'`
- **Text Transform**: `UPPERCASE`
- **Background**: Status-based color

### Action Buttons
- **Primary Actions**: `#007AFF` color with icons
- **Padding**: `4px` for touch targets
- **Icon Size**: `16px` for small actions, `20px` for favorites
- **Text Size**: `fontSize: 12, fontWeight: '500'`

### Connection Status
- **Dot Size**: `8px x 8px`
- **Colors**: 
  - Connected: `#34C759`
  - Connecting: `#FF9500`
  - Disconnected: `#FF3B30`

## Interaction Patterns

### Touch Feedback
- **Scale Animation**: Scale to `0.98` on press
- **Active Opacity**: `0.9` for touchable areas
- **Spring Animation**: Used for smooth press/release

### Loading States
- **Primary Color**: `#2196F3` for loading indicators
- **Icon Size**: `40px` for loading icons
- **Text**: `fontSize: 16` for loading messages

### Empty States
- **Icon Size**: `64px`
- **Icon Color**: `#C7C7CC`
- **Title**: `fontSize: 20, fontWeight: '600', color: '#8E8E93'`
- **Subtitle**: `fontSize: 14, color: '#C7C7CC'`

## Screen-Specific Patterns

### Headers
- **Background**: `#2196F3`
- **Text Color**: `#FFFFFF`
- **Height**: Auto with `paddingVertical: 12`
- **Icons**: `24px` white icons for actions
- **Title**: `fontSize: 20, fontWeight: '600'`

### Status Bar
- **Style**: `light-content` for dark headers
- **Background**: Matches header color (`#2196F3`)

### Search Components
- **Background**: `#FFFFFF`
- **Border**: `#E5E5EA`
- **Placeholder Color**: `#8E8E93`

## Accessibility

### Color Contrast
- All text meets WCAG AA standards
- Status colors provide sufficient contrast
- Icons supplement color-based information

### Touch Targets
- Minimum `44px` touch target size
- Adequate spacing between interactive elements
- Clear visual feedback for all interactions

## Platform Considerations

### iOS Styling
- Uses iOS system colors and conventions
- Native feel with iOS-style navigation
- System font weights and sizing

### Android Compatibility
- Material elevation system
- Appropriate shadow rendering
- Touch feedback patterns

## Animation Guidelines

### Micro-interactions
- **Duration**: 200-300ms for state changes
- **Easing**: Spring animations for natural feel
- **Scale**: Subtle (0.98) for press feedback

### Loading Transitions
- Smooth fade-ins for content
- Progressive loading patterns
- Clear loading indicators

---

*This guide ensures consistent visual presentation across all EMU Alerts interfaces and provides a foundation for future design decisions.*
