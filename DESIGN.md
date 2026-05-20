---
version: alpha
name: The-Penguin-Circle-design
description: |
  A terminal-native, hacker-aesthetic landing page for The Penguin Circle — a community learning circle for CLI, Git, and AI-powered development. Near-black canvas, electric terminal green accent, monospace typography throughout, and ASCII penguin mascot as the only ornament. The page reads like a well-formatted README rendered in a terminal emulator.

colors:
  primary: "#00ff41"
  primary-soft: "#27c93f"
  primary-deep: "#10b981"
  on-primary: "#0a0a0a"
  ink: "#e0e0e0"
  ink-strong: "#ffffff"
  body: "#a0a0a0"
  mute: "#6b7280"
  hairline: "#2a2a2a"
  hairline-strong: "#3d3d3d"
  canvas: "#0a0a0a"
  canvas-soft: "#121212"
  canvas-elevated: "#1a1a1a"
  terminal-red: "#ff5f56"
  terminal-yellow: "#ffbd2e"
  terminal-green: "#27c93f"

typography:
  display-xl:
    fontFamily: "JetBrains Mono, Courier New, ui-monospace, monospace"
    fontSize: 42px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 2px
  display-lg:
    fontFamily: "JetBrains Mono, Courier New, ui-monospace, monospace"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 1px
  display-md:
    fontFamily: "JetBrains Mono, Courier New, ui-monospace, monospace"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0.5px
  heading-lg:
    fontFamily: "JetBrains Mono, Courier New, ui-monospace, monospace"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0.5px
  body-md:
    fontFamily: "JetBrains Mono, Courier New, ui-monospace, monospace"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0px
  body-sm:
    fontFamily: "JetBrains Mono, Courier New, ui-monospace, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0px
  button-md:
    fontFamily: "JetBrains Mono, Courier New, ui-monospace, monospace"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0px

rounded:
  none: 0px
  sm: 4px
  md: 6px
  pill: 9999px

spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px
  section: 80px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.sm}"
    padding: 10px 24px
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    borderColor: "{colors.primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.sm}"
    padding: 10px 24px
  card-feature:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 24px
  code-snippet:
    backgroundColor: "{colors.canvas-elevated}"
    textColor: "{colors.primary}"
    borderColor: "{colors.hairline}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 12px 16px
  hero-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-strong}"
    padding: 80px 24px
  footer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
    padding: 40px 24px
---
