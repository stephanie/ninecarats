# Project Rules

## 1. Next.js & React Best Practices

- Use functional components with TypeScript for type safety
- Follow Next.js 13+ App Router conventions
- Use Server Components by default, Client Components only when necessary
- Implement loading and error states for all routes
- Set metadata for SEO optimization
- Optimize images using Next.js Image component
- Use data fetching patterns (Server Components, React Query when needed)
- Implement error boundaries
- Use caching strategies for Shopify data
- Follow React Server Components best practices for data fetching

## 2. Tailwind CSS Guidelines

- Use Tailwind's utility classes for styling
- Follow mobile-first responsive design
- Implement color scheme with dark mode support
- Use spacing scale (4px increments)
- Use typography scale
- Use breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px
- Use container queries when needed
- Use animation and transition classes
- Include accessibility classes
- Use state classes (hover, focus, active)

## 3. Shopify Integration

- Use Shopify Storefront API patterns
- Handle product variants
- Manage cart functionality
- Implement checkout flow
- Handle product images
- Manage collections
- Format prices
- Track inventory
- Handle customer authentication
- Manage orders

## 4. File & Folder Structure

```
app/
  ├── [page]/
  │   ├── layout.tsx
  │   └── page.tsx
  ├── product/
  │   ├── [handle]/
  │   │   └── page.tsx
  │   └── layout.tsx
  ├── search/
  │   ├── layout.tsx
  │   └── page.tsx
  └── layout.tsx
components/
  ├── cart/
  ├── grid/
  ├── layout/
  ├── product/
  └── shared/
lib/
  ├── shopify/
  └── utils/
```

## 5. Component Guidelines

- Use component composition
- Define prop types with TypeScript
- Handle errors
- Show loading states
- Include accessibility attributes
- Follow naming conventions:
  - PascalCase for components
  - camelCase for functions and variables
  - kebab-case for CSS classes
- Document components
- Write tests

## 6. Performance Guidelines

- Implement code splitting
- Optimize images
- Use caching strategies
- Implement lazy loading
- Use preloading
- Optimize bundles
- Use server-side rendering
- Use static generation when possible
- Implement incremental static regeneration
- Use edge functions when needed

## 7. Security Guidelines

- Implement authentication
- Set up authorization
- Validate input
- Prevent CSRF attacks
- Prevent XSS attacks
- Set content security policy
- Implement rate limiting
- Handle errors
- Set up logging
- Use environment variables

## 8. Testing Guidelines

- Write unit tests
- Write integration tests
- Write end-to-end tests
- Maintain test coverage
- Document tests
- Automate tests
- Set up test data
- Configure test environment
- Generate test reports
- Maintain tests

## 9. Documentation Guidelines

- Write code comments
- Maintain README files
- Document APIs
- Document components
- Keep changelog
- Write contribution guidelines
- Use issue templates
- Use pull request templates
- Version documentation
- Maintain documentation

## 10. Git & Deployment Guidelines

- Follow branching strategy
- Write clear commit messages
- Follow pull request process
- Review code
- Follow deployment process
- Manage environments
- Use version control
- Set up backups
- Monitor application
- Set up logging

## 11. Package Management Guidelines

- Use pnpm as the package manager to install and manage dependencies

---

**Always refer to this file before starting new work or reviewing code.**
