

## 3D Premium Design Portfolio

### Theme & Visual Identity
- **Dark mode**: Deep zinc-950 background throughout
- **Accent colors**: Neon purple (#a855f7) and deep indigo gradients
- **Glassmorphism**: Frosted glass cards with backdrop-blur and subtle white/10 borders
- **Typography**: Large bold headlines with tight tracking, clean body text

### Sections

1. **Hero Section**
   - Massive animated headline with text reveal effect on the left
   - 3D placeholder model (geometric torus knot or icosahedron) on the right using React Three Fiber
   - Model floats with sine-wave animation and subtly follows the mouse cursor
   - Purple glow loading pulse while the 3D scene initializes
   - Smooth scroll-down indicator

2. **About Me**
   - Split layout with a brief creative bio and key skills/tools displayed as glowing tags
   - Subtle fade-in animation on scroll

3. **Projects — Bento Grid**
   - Asymmetric grid layout with varying col-span/row-span cards
   - Each card shows project image, title, and category
   - Hover: scale-up + neon purple border glow effect
   - Parallax scroll effect on cards using Framer Motion

4. **Resume / Timeline**
   - Vertical timeline with alternating left/right entries
   - Work experience and education with dates, roles, and descriptions
   - Animated line that fills as user scrolls

5. **Testimonials**
   - Horizontal carousel of quote cards with glassmorphism styling
   - Client name, role, and avatar placeholder

6. **Contact Form**
   - Clean form with name, email, and message fields (validated with Zod)
   - "Magnetic" submit button that subtly follows cursor on hover
   - Success toast notification on submit

7. **Footer**
   - Minimal with social links and copyright

### 3D Implementation
- `Scene.tsx` component using `@react-three/fiber` and `@react-three/drei`
- Placeholder geometric shape with metallic purple material and environment lighting
- `<Stage>` for studio lighting, `<PresentationControls>` for user rotation
- Wrapped in `<Suspense>` with a glowing skeleton fallback
- Ready to swap in a real `.glb` model later

### Smooth Scrolling & Animations
- Framer Motion for scroll-triggered fade/slide animations on each section
- Parallax depth effects on Bento grid cards
- Smooth page scrolling behavior via CSS `scroll-behavior: smooth`

### Navigation
- Fixed top navbar with transparent-to-glass effect on scroll
- Smooth scroll links to each section

