# E-Commerce UI Design Language

**Version:** 2.0

---

# Philosophy

The UI should feel:

- Minimal
- Calm
- Premium
- Fast
- Functional
- Product-first

Inspired by:

- Notion
- Linear
- Vercel
- Apple Store
- Nike
- Strava
- shadcn/ui

The interface should disappear so users focus on the products.

---

# Core Principles

## Content First

Content is always more important than decoration.

Prefer:

- whitespace
- readable layouts
- clear hierarchy

Avoid:

- heavy gradients
- oversized icons
- unnecessary animations
- visual clutter

---

## Consistency

Reuse existing patterns.

Never redesign a component if an existing solution already fits.

---

# Brand

This project uses **Tailwind's default Orange palette**.

Inspired by:

- Strava
- Nike
- Hoka

Use orange only as an accent.

Recommended colors

```
orange-50
orange-100
orange-200
orange-600
orange-700
```

Use orange for:

- logo
- primary buttons
- active navigation
- search focus
- links
- cart badge
- sale badge
- announcement bar

Avoid orange page backgrounds and large orange sections.

**Color Balance**

- 90% Neutral
- 10% Orange

---

# Typography

## Page Title

```
text-3xl font-semibold tracking-tight
```

## Section Title

```
text-xl font-semibold
```

## Card Title

```
text-lg font-semibold
```

## Body

```
text-sm
```

## Helper Text

```
text-sm text-muted-foreground
```

## Error

```
text-sm text-destructive
```

---

# Spacing

Use the 8px spacing system.

Preferred

```
gap-2
gap-4
gap-6
gap-8

space-y-2
space-y-4
space-y-6
space-y-8
```

---

# Radius

Default

```
rounded-lg
```

Only use

```
rounded-full
```

for avatars, badges and pills.

---

# Borders & Shadows

Prefer borders over shadows.

```
border-border
shadow-sm
```

Avoid heavy shadows.

---

# Buttons

Always use shadcn Button.

```tsx
<Button />
<Button variant="secondary" />
<Button variant="outline" />
<Button variant="destructive" />
```

Never manually style button colors.

---

# Inputs

Always use shadcn Input.

Structure

```
Label

Input

Validation

Helper Text
```

Search should always be easy to find.

---

# Cards

Prefer

- Card
- CardHeader
- CardContent
- CardFooter

Avoid custom wrappers.

---

# Header

Layout

```
Logo

Navigation

Search

Actions
```

Search should take the most space.

Keep headers clean and lightweight.

---

# Links

Default

```
text-muted-foreground
```

Hover

```
hover:text-foreground
```

Primary

```
text-orange-600
hover:text-orange-700
```

---

# Icons

General

- lucide-react

Brand

- react-icons

Never mix icon styles.

---

# Animations

Use

```
transition-colors
transition-opacity
transition-transform
duration-200
```

Keep animations subtle.

---

# Layout

Page

```
max-w-7xl
```

Section

```
max-w-5xl
```

Form

```
max-w-md mx-auto
```

---

# Component Order

```
Header

Content

Actions

Footer
```

---

# Reusable Components

Prefer reusable components.

Examples

- PageHeader
- SectionHeader
- SearchBar
- ProductCard
- ProductGrid
- ProductGallery
- Price
- Rating
- QuantitySelector
- EmptyState
- LoadingButton
- StatusBadge

Never duplicate UI more than twice.

---

# Folder Structure

```
src/

shared/
    components/
    ui/
    hooks/
    utils/
    constants/

features/

pages/

config/
```

---

# Accessibility

Every input needs

- label
- id
- autocomplete

Buttons need

- type

Icons need

```tsx
aria-hidden="true"
```

Interactive elements must have keyboard focus.

---

# Naming

Good

```
HeaderNavigation
HeaderSearch
HeaderActions

ProductCard
ProductGrid
ProductGallery

PageHeader
LoadingButton
```

Bad

```
HeaderLeft
HeaderRight

Box
Wrapper
Container2
```

---

# Checklist

Before creating a component ask:

- Can I reuse an existing component?
- Does shadcn already provide it?
- Does it follow spacing rules?
- Is the naming clear?
- Is it reusable?
- Does it match the rest of the app?

---

# Overall Feeling

Every screen should feel:

- Quiet
- Balanced
- Athletic
- Premium
- Professional

Think:

**Notion × Linear × Apple Store × Strava**

The products should attract attention.

Orange should guide attention—not dominate the interface.
