# Invitation-idea Editing Guide

This invitation is reusable. For each wedding, edit `data.js` and replace files inside `assets/images` or `assets/music`.

Do not edit `index.html`, `style.css`, or `script.js` when changing client information.

## Important: Open the Correct Folder

Always edit and run Live Server from the same `Invitation-idea` folder.

If you open the copy inside `outputs/Invitation-idea`, edit its `data.js`. Changes made in another copy will not appear there.

After making changes, save the file and press `Ctrl + F5` in the browser.

## Change the Bride and Groom Names

Open `data.js` and change:

```js
brideName: "Name of the bride",
groomName: "Name of the groom",
```

Example:

```js
brideName: "Elira",
groomName: "Arben",
```

The names update automatically in the hero and WhatsApp RSVP messages.

## Change the Wedding Date and Time

```js
weddingDate: "2026-08-15T19:00:00",
displayDate: "15 Gusht 2026",
displayTime: "19:00",
```

- `weddingDate` controls the countdown. Keep the format `YYYY-MM-DDTHH:MM:SS`.
- `displayDate` is the Albanian date shown to visitors.
- `displayTime` is the displayed event time.

## Change the Venue and Google Maps Link

```js
locationName: "Name of the restaurant",
address: "Full address",
googleMapsLink: "https://maps.google.com/...",
```

Open the venue in Google Maps, select Share, copy the link, and paste it inside the quotation marks.

## Change the Music

1. Put the new music file inside `assets/music`.
2. Update the path in `data.js`:

```js
music: "assets/music/my-wedding-song.mp3",
```

Use an MP3 file optimized for the web. Music starts only after the visitor taps the opening screen.

## Change the Opening Video

The current opening video is:

```js
openingVideo: "assets/images/epening-envelope.mp4",
```

To replace it:

1. Put a vertical MP4 inside `assets/images`.
2. Update `openingVideo` with the exact filename.
3. Keep the `.mp4` extension and match uppercase/lowercase spelling.

Recommended: 1080 x 1920, H.264 MP4, optimized for mobile.

## Change the Hero Dance Video

The video behind the couple names is controlled by:

```js
heroVideo: "assets/images/video-dance.mp4",
```

Replace the file or change the path to the exact new filename. The hero video should be muted, vertical, and optimized for mobile.

## Change the Hero Fallback Photo

This photo appears if the hero video cannot load:

```js
heroImage: "assets/images/hero.jpg",
```

Put the replacement photo inside `assets/images`. A vertical image around 1080 x 1920 works best.

## Change Gallery Photos

Put gallery images inside `assets/images`, then update:

```js
galleryImages: [
  "assets/images/photo1.jpg",
  "assets/images/photo2.jpg",
  "assets/images/photo3.jpg"
],
```

You can add more photos by adding more quoted paths separated by commas.

## Change Family Text

```js
familyText: "Invitation message in Albanian.",
brideFamily: "Family of the bride",
groomFamily: "Family of the groom",
```

## Change Dress Code

```js
dressCode: "Veshje elegante",
```

## Gift Information

```js
giftInfo: "",
```

- Leave it empty (`""`) to hide the gift section.
- Add text between the quotation marks to show it.

## Change RSVP WhatsApp Number

```js
rsvpPhone: "38970123456",
```

Use the international number with country code and digits only. Do not use `+`, spaces, or dashes.

## Change Contact and Studio Details

```js
studioName: "Foto Studio ART",
contactPhone: "070 123 456",
```

## Skyliine Footer Credit

```js
poweredByName: "SKYLIINE",
poweredByInstagram: "https://www.instagram.com/skyliine.agency/",
```

## Optional Canva/Figma Assets

Optional exported decorations can be placed in `assets/images`:

```text
luxury-bg.png
gold-frame.png
floral-corner-top.png
floral-corner-bottom.png
wax-seal.png
invitation-card.png
```

The invitation still works with CSS decorations when these files are missing.

## Troubleshooting

- Save `data.js` before refreshing.
- Press `Ctrl + F5` to clear cached files.
- Confirm Live Server is opened from the folder you edited.
- Confirm filenames and extensions match `data.js` exactly.
- Avoid spaces and special symbols in media filenames.
- Use H.264 MP4 video and MP3 audio for the widest mobile support.
