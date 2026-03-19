# 🛍️ Algerian E-Commerce — COD Storefront

A full-stack e-commerce web app built for the Algerian market. Customers browse products, place orders with delivery details, and pay on delivery — no account required.

🔗 **Live:** [ecom-dz.vercel.app](https://ecom-dz.vercel.app)

---

## ✨ Features

### Storefront
- Product grid with images, names, and prices
- Dedicated product page with image gallery and thumbnails
- Order form at the bottom of each product page — no redirects, no popups

### Order Form
- Customer fills: name, phone, wilaya (all 48), delivery type, color, quantity, and an optional note
- Live order summary that updates in real time as the customer changes options
- Delivery fee logic: home delivery vs. desk delivery, priced per wilaya
- Confirmation page with order summary after submission

### Bilingual UI
- **Arabic by default** with full RTL layout
- One-click switch to **French** with LTR layout
- All labels, buttons, errors, and messages are translated

### Admin Dashboard
- Protected route with email + password login
- View all orders sorted by newest first
- Filter by status: All / Pending / Confirmed / Delivered / Canceled
- Update order status inline with no page reload
- Manage products: add, edit, delete with multi-image upload

---

## 🧱 Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Hosting | Vercel |

---

## 📄 License

All rights reserved — contact me for licensing.