# Changelog

All notable changes to Nudge, newest first.

## v2.4.0: Swipe to delete, new logo, full-screen layout
- **New app icon:** a double-layered flame.
- **Full-screen layout:** the app now uses the space behind the status bar and the notch, and sits above the phone's navigation bar. Status bar icons switch colour with your theme.
- **Swipe to delete:** swipe a reminder left to reveal a red dustbin. Tapping it, or the Delete button in the editor, now asks "Delete this reminder?" with Yes and No.
- **Profiles, tidied up:** the Active, Use and ✕ buttons are gone. The active profile is highlighted and always sits on top. Tap a profile to switch, tap the ⭐ to make it the default, and swipe a profile left to delete it (with a confirmation).
- **More choice:** over 100 reminder emojis (up from 37) and 32 profile avatars (up from 8).
- **Bigger "Sleeping / I'm awake" card**, easier to see and tap.
- Removed the developer-only **Test** button and **Preview overlap** switch.
- Removed a stray divider line above the Essential switch.

## v2.3.0: Choose your default profile
- **Any profile can be the default.** In *Profiles*, tap the ☆ next to a profile to make it your default (⭐). The first profile is no longer permanently the default.
- **Rename freely.** Every profile, including the default, can be named anything.
- The ⭐ Essential reminders of whichever profile is the default fire in all other profiles. If you change the default, the new default's essential reminders take over.
- The default profile can't be deleted. Make another profile the default first.
- New README with the motivation behind the app, install help and a troubleshooting note for Android's "package conflicts with an existing package" message.

## v2.2.0: Essential reminders
- Mark a reminder in the default profile as **⭐ Essential** and it keeps firing while any other profile is active.
- In other profiles, essential reminders appear under their own ⭐ heading, where you can pause or edit them. They also count in that profile's heatmap.
- The usual overlap rules apply when an essential reminder lands together with others.

## v2.1.1: Build fix
- Fixed a build failure in the lock-screen patch. It used a wrong variable name, and its fallback used a path that no longer existed. The patch now fits, and if it ever can't, the app builds without it.

## v2.1.0: Lock screen, easier profiles, public repo
- The profile button now sits next to the *Your reminders* heading, bigger and easier to reach.
- Zen mode reminders can open over the lock screen (full-screen intent). On newer Android versions you may need to allow full-screen notifications for Nudge.
- The signing key moved out of the repository into a private GitHub secret, so the repository can be public.

## v2.0.0: Profiles, Done button, Zen mode, heatmap
- **Profiles:** separate sets of reminders. Only the active profile sends notifications.
- **Done button** on every reminder, in the notification and in the app. Completions are stored on your phone only.
- **Zen mode:** a full-screen reminder with one big button and a short vibration.
- **Progress heatmap** (off by default): week and month views, green for done, red for missed, blank for no reminders, tap a day for details.
- A reminder counts as missed when the next one for the same task arrives without ✓ Done being pressed.
- Added a fixed signing key so later versions can install over earlier ones.

## v1.1.0: Themes and reliability
- 16 bundled themes (8 light, 8 dark) and a light/dark toggle at the bottom left. Press and hold it to choose a theme.
- Exact alarms, so battery saver no longer delays reminders.
- Time-window reminders repeat on their own every day, so the app never needs reopening to top them up.

## v1.0.0: First release
- Time-window and "when I'm awake" reminders with custom intervals, several running at once.
- Overlap handling: a few seconds apart for two or three, one combined notification for four or more.
- Optional unique emoji per reminder, emoji-only mode, and a name and avatar.
