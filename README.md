<p align="center"><img src="icon.png" width="110" alt="Nudge logo, a double-layered flame"></p>

# Nudge

**Gentle, repeating reminders for the small things that keep a day running well.**
Drink water. Stand up. Rest your eyes. Take a break. Nudge is an Android app that does this one job calmly and keeps everything on your phone.

[Download the latest APK](../../releases/latest) · [What's new](CHANGELOG.md)

## Motivation

Most reminder apps want an account, a subscription or a long list of permissions, and many end up as one more thing to check. Nudge started from a much smaller idea: *remind me to drink water every 30 minutes*, and nothing more.

It grew only in ways that serve that idea:

- **Reminders should fit your day.** Some run all day on a schedule. Others should run only while you are working. So a reminder can follow a time window or follow *you*, starting when you wake or sit down and stopping when you finish.
- **Many habits, one calm app.** Water, posture, eyes and medication shouldn't fight each other. Nudge spaces overlapping reminders a few seconds apart and folds a crowd into one tidy notification.
- **Less phone, not more.** Zen mode turns a reminder into one big button. Tap it and you are done, with no hunting through menus and no reason to open anything else.
- **Honest feedback.** A heatmap shows what you kept up with and what you missed. It's meant as a mirror, not a scoreboard.
- **Nothing to trust.** No account, no ads, no analytics. Your reminders and history stay on the device. The only permission Nudge asks you for is notifications.

## Features

- **Two ways to schedule a reminder**
  - **Time window:** for example every 30 minutes from 5:00 AM to 11:00 PM, every day.
  - **When I'm awake:** reminders start when you tap *I'm awake* and stop when you tap *Go to sleep*.
- **Custom intervals** and as many reminders as you like at once.
- **Smart overlaps:** two or three reminders landing together arrive a few seconds apart. Four or more become one combined notification that opens into a list. Tap an item to jump to that reminder.
- **Profiles:** separate sets of reminders, such as *Home* and *Study*. Tap a profile to switch. The active one is highlighted and sits on top, and only it sends notifications. Swipe a profile left to delete it.
- **Default profile and ⭐ Essential reminders:** pick any profile as your default (it can be named anything). Mark a reminder in it as ⭐ Essential and it keeps firing in every other profile too.
- **Swipe to delete:** swipe a reminder to the left to reveal a red dustbin, tap it, and confirm with Yes or No. The Delete button inside a reminder asks the same question.
- **Done button:** every reminder has a ✓ Done button, in the notification and in the app. Completions are stored on your phone.
- **Zen mode:** a reminder opens as a full-screen view with one big button and a short vibration. It can open over the lock screen when Android allows it.
- **Progress heatmap** (off by default): a week or month grid. Green means done, red means missed, and darker means a bigger share. Blank means no reminders were active. Tap any day for the details.
- **Emojis:** an optional emoji per reminder (over 100 to pick from), never repeated among reminders that fire together. Pick your own avatar from 32. Emoji-only mode shows just the emoji, with no words.
- **Themes:** a light/dark toggle at the bottom left, and 16 themes (press and hold the toggle).

## Ways to use it

**Focus sessions.** "When I'm awake" is really an on/off switch you control. Make a *Study* profile with a "Look away from the screen" reminder every 25 minutes in *When I'm awake* mode. Tap *I'm awake* when you sit down to work and *Go to sleep* when you finish. You get reminders only while you are focused, and none the rest of the day.

**Different days, different routines.** Keep a base profile for normal days and others for exams, travel or a night shift. Mark the things that matter every day (medication, water) as ⭐ Essential in your default profile so a profile switch never silences them.

**Stay off your phone.** Turn on Zen mode and answer each reminder with a single tap.

**See the pattern.** Turn on the heatmap to find out which days you kept up and which you didn't.

## Install (Android)

1. Open the [latest release](../../releases/latest) on your phone and download the `.apk` file.
2. Open the file. If Android asks, allow installing from that source. If Play Protect warns about an unscanned app, choose *Install anyway*.
3. Open Nudge and tap **Allow** when it asks to show notifications.
4. Optional: if reminders arrive late on Xiaomi, Oppo, Vivo or Samsung phones, set *Settings → Apps → Nudge → Battery* to **Unrestricted**.

**Updating:** install the new APK over the old one and your reminders, profiles and history are kept. Every release is signed with the same key, so each update is recognised as an update. If Android says *"App not installed as package conflicts with an existing package"*, the copy on your phone was signed with a different key (this only affects builds from before v2.4.1). Uninstall Nudge once, then install the new APK. The uninstall erases saved reminders, and every update after that installs in place.

## Permissions and privacy

Nudge asks you for one thing: permission to show notifications. It also declares a few permissions that Android grants without asking, so that reminders arrive on time: exact alarms, vibration and showing Zen mode over the lock screen.

Your reminders, completions and history are stored only on your phone, and there are no accounts or analytics. When you are online, the app loads its typefaces from Google Fonts. Remove the single `<link>` line near the top of `index.html` if you want a fully offline app.

## How "missed" is decided

A reminder is **done** when you press ✓ Done for it. It is **missed** when the next reminder for the same task arrives and ✓ Done was never pressed. The last reminder of a window or session is judged one interval after it fires. Reminders that were never scheduled, such as a paused task, a stopped session or a profile that wasn't active, don't count at all.

## Good to know

- ✓ Done on a notification opens Nudge briefly to save the answer, because Android hands the tap to the app.
- "When I'm awake" reminders stop after 16 hours if you forget to tap *Go to sleep*.
- Your history starts from the day you install a version that includes the heatmap.
- On Android 14 and newer, if Zen mode doesn't open over the lock screen, allow full-screen notifications for Nudge in the phone's app settings. Tapping the notification always opens it.

## Build it yourself

Nudge is a single web page (`index.html`) wrapped as an Android app with [Capacitor](https://capacitorjs.com). GitHub builds the APK for you, with no computer setup:

1. Put `index.html`, `native.js`, `package.json`, `capacitor.config.json`, `MainActivity.java`, `icons.zip` and `icon.png` in your repository.
2. Add `build-apk-workflow.txt` as `.github/workflows/build-apk.yml`.
3. Create a signing key once and store it as a secret named `KEYSTORE_BASE64` (*Settings → Secrets and variables → Actions*). Keep the key file out of the repository. Keeping the same key lets new versions install over old ones. The build stops with a clear error if the secret is missing, and every run prints the signing fingerprint in its summary, which should be identical from run to run.
4. Open the *Actions* tab. After about 5 minutes, download the APK from the finished run.

See the [changelog](CHANGELOG.md) for the full version history.
