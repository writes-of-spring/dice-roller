# Dice Rolling App

React app for quick dice rolls when players outnumber the available dice.

## Development

This project uses pnpm. Enable Corepack once if pnpm is not already available:

```sh
corepack enable
```

```sh
pnpm install
pnpm dev
```

## Checks

```sh
pnpm build
pnpm test
pnpm lint
pnpm format:check
```

- [x] Randomise Rolls
- [x] Reduce Rolls to Total
- [x] Present all information on to the screen (covering rolling with advantage/disadvantage)
- [ ] style it better
- [ ] Remove iOS Safari zoom in to focused element

## Rolling

- Roll 1–10 dice, with an optional whole-number modifier from -1000 to 1000.
- D20 advantage and disadvantage keep one of two dice, then apply the modifier once.
- D100 rolls use tens and units; 00 and 0 count as 100.
- Roll again repeats the latest result’s settings. Recent rolls keeps the last 10 rolls until you refresh or clear the history.
- Switching to a single check preserves your normal dice quantity.

The calculation tests run with Vitest. Use `pnpm test` for a single run or `pnpm test:watch` to rerun tests as you edit.
