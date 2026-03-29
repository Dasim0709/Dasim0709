# Fridge Flow AI

A browser-only MVP for a fridge-to-recipe website.

## What It Does

- Upload a fridge photo and run a local ingredient estimation demo
- Auto-assign conservative use-by dates per ingredient
- Prioritize ingredients that are close to expiry
- Weight recommendations by breakfast, lunch, dinner, or late-night timing
- Add extra ranking pressure from recent food-trend signals
- Show recipe steps and explain why each dish ranked highly

## Run It

1. Open `index.html` in a browser.
2. Load the sample fridge or add ingredients manually.
3. Optionally upload a photo and run the demo scan.
4. Review the ranked recipes on the right side.

## Files

- `index.html`: page structure
- `styles.css`: layout and visual design
- `app.js`: fridge state, photo demo, expiry logic, ranking engine, recipe detail

## Production Next Steps

- Replace `simulateVisionAnalysis()` with a real vision API
- Refresh trend signals from a real source on a schedule
- Add auth, saved fridges, notifications, and OCR for package dates
