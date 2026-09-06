# 🧶 Bolajonlar — O‘ynab o‘rganamiz!

Bolalar uchun to‘qilgan ip (crochet/yarn) uslubidagi o‘zbek tilidagi ta’limiy PWA (Progressive Web App).

## Bo‘limlar

- 🔤 Harflar — o‘zbek lotin alifbosi, har biriga misol so‘z va ovoz
- 🔢 Sonlar — 1 dan 10 gacha (100 gacha kengaytirish uchun `NUMBERS` massivini `app.js` da to‘ldiring)
- 🎨 Ranglar — 10 ta asosiy rang
- 🔷 Geometrik shakllar — 6 ta shakl
- 🧒 Tana a’zolari — 7 ta a’zo (real inson tasviri ishlatilmagan)
- 🕐 Vaqt — analog soat bilan mashqlar
- 🐾 Hayvonlar, 🍎 Mevalar, 🌳 Tabiat, 🚗 Transport
- 🧠 Quiz — 10 ta tasodifiy savol, 4 ta javob varianti
- 🏆 Reyting — natijalar qurilmaning `localStorage` xotirasida saqlanadi (internet kerak emas)

## Texnik xususiyatlar

- Faqat **HTML5 + CSS3 + Vanilla JavaScript** — hech qanday tashqi kutubxona yoki CDN ishlatilmagan
- **Service Worker** (`sw.js`) orqali to‘liq oflayn ishlaydi (cache-first strategiya)
- **Web App Manifest** (`manifest.json`) — telefonga "ilova sifatida" o‘rnatish mumkin
- Ovoz uchun brauzerning o‘zidagi **SpeechSynthesis API** (`uz-UZ`) ishlatilgan — audio fayl yo‘q
- Barcha ikonkalar mahalliy **SVG** fayllar (`assets/icons/`), to‘qilgan ip uslubida chizilgan
- Inson rasmi yoki yuzi ishlatilmagan

## Ishga tushirish

### Mahalliy kompyuterda
Har qanday oddiy statik server bilan oching (Service Worker `file://` protokolida ishlamaydi):

```bash
cd bolajonlar
python3 -m http.server 8080
```

So‘ng brauzerda `http://localhost:8080` manzilini oching.

### GitHub Pages orqali
1. Ushbu papka tarkibini repozitoriyaning ildiziga yuklang.
2. Repository → Settings → Pages bo‘limida asosiy branch va `/root` papkasini tanlang.
3. Bir necha daqiqadan so‘ng ilova `https://<username>.github.io/<repo>/` manzilida ishga tushadi.
4. Ilovani bir marta ochgach, Service Worker barcha fayllarni keshlaydi va keyingi safar **internetsiz** ham ochiladi.

## Fayl tuzilishi

```
bolajonlar/
├── index.html
├── style.css
├── app.js
├── sw.js
├── manifest.json
├── README.md
└── assets/
    └── icons/
        ├── logo.svg
        ├── letters.svg
        ├── numbers.svg
        ├── colors.svg
        ├── shapes.svg
        ├── body.svg
        ├── time.svg
        ├── animals.svg
        ├── fruits.svg
        ├── nature.svg
        ├── transport.svg
        ├── quiz.svg
        └── ranking.svg
```

## Kengaytirish

- **Sonlarni 100 gacha kengaytirish**: `app.js` faylida `NUMBERS` massiviga yangi juftliklar (`["11","o‘n bir"]` kabi) qo‘shish kifoya — qolgan barcha kod (grid, ovoz, quiz) avtomatik ishlaydi.
- **Yangi bo‘lim qo‘shish**: `makeEmojiSection()` funksiyasidan foydalanib, yangi massiv va bitta qator kod bilan yangi kategoriya qo‘shish mumkin.
