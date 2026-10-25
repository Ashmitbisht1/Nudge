# Nudge

Gentle, repeating reminders for the things you keep forgetting: drink water, stand up, rest your eyes, take a break. Nudge runs entirely on your phone. Your reminders and your history are stored on the device only, and nothing is sent anywhere. The only permission it asks for is notifications.

## What it does

- **Reminders.** Each one has a name, a repeat interval you choose, and an optional emoji. Emojis never repeat inside a profile.
- **Two ways to schedule a reminder.**
  - **Time window:** for example every 30 minutes from 5:00 AM to 11:00 PM, every day.
  - **When I'm awake:** reminders start when you tap *I'm awake* and stop when you tap *Go to sleep*.
- **Many at once.** Run as many reminders as you like at the same time.
- **Smart overlaps.** If two or three reminders land together, they arrive a few seconds apart. Four or more become one combined notification that opens into a list. Tap any item to jump to that reminder.
- **Emoji-only mode.** Notifications show just the emoji and no words.
- **Themes.** Tap the small circle at the bottom left to switch light and dark. Press and hold it to choose from 16 themes.

## Ways to use it

**Focus sessions.** "When I'm awake" is really an on/off switch you control. Make a *Study* profile with a "Look away from the screen" reminder every 25 minutes in *When I'm awake* mode. Tap *I'm awake* when you sit down to work and *Go to sleep* when you finish. You get reminders only while you are focused, and none the rest of the day.

**Different days, different routines.** Keep a *Default* profile for normal days and a *Study* or *Travel* profile for special ones. Switching profiles swaps the whole set of reminders.

**Stay off your phone.** Turn on Zen mode and tap one big button whenever it appears, with no hunting through menus.

**See the pattern.** Turn on the heatmap to find out which days you kept up and which you didn't.

## Versions

### v2.0: profiles, Done button, Zen mode, heatmap
- **Profiles.** Create separate sets of reminders (for example *Study*) next to the *Default* one. Only the active profile sends notifications. Rename or delete profiles from the profile chip on the home screen.
- **Done button.** Every reminder has a ✓ Done button, both in the notification and inside the app. Pressing it records that you did the task. The record stays on your phone.
- **Zen mode** (Settings). A reminder opens as a full-screen view with one big button in the middle. Tap it to record the task and the phone gives a short vibration. With several reminders, you get a list of buttons and an *All done* button.
- **Heatmap** (Settings, off by default). A week or month grid in the style of a contribution graph:
  - green means reminders you completed, and darker green means a higher share completed;
  - red means reminders you missed, and darker red means a higher share missed;
  - blank means no reminders were active that day.
  Tap any day to see each reminder with the time and whether it was done or missed. The heatmap shows the active profile.
- **Settling in place.** The new signing key lets later versions install over this one without uninstalling.

### v1.1: themes and reliability
- 16 bundled themes (8 light, 8 dark) and the light/dark toggle.
- Exact alarms, so battery saver does not delay reminders.
- Time-window reminders repeat on their own every day, so the app never needs reopening to top them up.

### v1.0: first release
- Time-window and when-I'm-awake reminders with custom intervals, several at once.
- Overlap handling and combined notifications, optional emojis, emoji-only mode, a name and avatar.

## How "missed" is decided
A reminder is **done** when you press ✓ Done for it. It is **missed** when the next reminder for the same task arrives and ✓ Done was never pressed. The last reminder of a window or session is judged one interval after it fires. Reminders that were never scheduled, such as a paused task, a stopped session or an inactive profile, don't count at all.

## Good to know
- ✓ Done on a notification opens Nudge briefly to save the answer, because Android hands the tap to the app.
- Zen mode appears as soon as you open the app from a notification, or on its own if Nudge is already open. When your phone is locked, Android shows the normal notification, and tapping it opens the full-screen view.
- "When I'm awake" reminders stop after 16 hours if you forget to tap *Go to sleep*.
- If reminders arrive late on Xiaomi, Oppo, Vivo or Samsung phones, set Settings > Apps > Nudge > Battery to *Unrestricted*.
- History is recorded from the day you install v2.0.

## Building the APK
Upload `index.html`, `native.js`, `package.json`, `capacitor.config.json` and `debug.keystore` to your GitHub repository. Put `build-apk-workflow.txt` in as `.github/workflows/build-apk.yml`. Keep the repository **private**, because it contains the signing key. GitHub builds the app in about 5 minutes and you download it from the Actions tab.
