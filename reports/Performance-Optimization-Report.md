## 1. Optimization goal

Reduce the amount of route-specific JavaScript loaded with the initial application entry point while preserving the existing page routes.

## 2. Change implemented

The application previously imported all page components eagerly in `src/App.jsx`. The implementation now uses React `lazy()` for page components and wraps the route list in `Suspense` with a visible loading fallback. Vite emits separate chunks for route pages.

## 3. Recorded build comparison

| Measurement | Before optimization | After optimization | Difference |
|---|---|---|---|
| Main JavaScript | 456.86 kB | 340.73 kB | 116.13 kB lower |
| Main JavaScript (gzip) | 135.87 kB | 106.23 kB | 29.64 kB lower |
| CSS | 231.84 kB | 231.84 kB | No change |
| Build duration observed | 2.38 s | 0.696 s | Environment dependent |

Calculations:
- Main JavaScript reduction: (456.86 − 340.73) / 456.86 × 100 ≈ 25.4%.
- Gzipped main JavaScript reduction: (135.87 − 106.23) / 135.87 × 100 ≈ 21.8%.

These figures compare the main JavaScript output. The post-optimization build also emits separate route chunks, so the comparison is not a claim that all JavaScript across every chunk has disappeared. The main benefit is that route components can be fetched on demand.

## 4. Why lazy loading helps

- Users do not need every page's code at the first render.
- Route-specific code is split into separate assets.
- The `Suspense` fallback provides a visible loading state while a lazy component loads.
- The approach keeps the existing route definitions while changing how page code is loaded.

## 5. Validation

After the change, `npm run build` ran successfully. The recorded output showed the main JavaScript bundle at 340.73 kB (106.23 kB gzip) and separate chunks for route components. The deployed application and Courses page were later confirmed working after the separate backend database fix.

## 6. Limitations and next steps

- CSS output remained 231.84 kB; Bootstrap CSS is still part of the bundle.
- Build time depends on the machine, cache, and environment; it is not a reliable standalone performance metric.
- No browser performance profile or before/after real-user timing measurement was supplied. Therefore, this report makes bundle-size claims only and does not claim a measured improvement in page-load time.
- Future work could inspect production Lighthouse results, network waterfall, route loading behavior, and whether importing only required Bootstrap JavaScript components is practical.
