# Ecommerce Website — Analytics 

An Ecommerce website built with HTML, CSS, and JavaScript utilizing a USTORA template as a base which has been modified. 
The website is hosted via GitHub Pages, and instrumented with full analytics using Google Tag Manager and GA4.

## Project Overview
The site hosts 4 different product pages, a cart, checkout page, and purchase confirmation page. 
Beyond the core site, the project implements a complete event tracking 
architecture and data pipeline — capturing user interactions via GTM, 
routing dataLayer submission data to Google Analytics
## Technical Architecture
```
Structure: 
Index.html is the host page
samsung-product.html, sony-product.html, apple-product.html, screen-product.html — The product pages which hold the item info in a dataset, as well as add to cart capabilities.
Cart.html is a review page which renders the item in the cart and allows for updating quantity or removing items
Checkout.html is the last review and renders items and their value and includes the tax and shipping costs
Thank-you.html is an order confirmation page that renders the final cart, shipping and tax costs, and generates and includes a transaction_id.
Additional Files:
utils.js, product.js, cart.js, checkout.js, thankyou.js, 

[Schema Doc](SCHEMADOC.md)
[Audit DOC](AUDITDOC.md)

Tracking implementation
Visitor loads a product page
        ↓
GTM container intercepts events via triggers
        ↓
Add to cart button is pressed
        ↓
DataLayer push captures structured ecommerce event data
        ↓
GA4 receives event data for interaction tracking
        ↓
Page proceeds to cart.html
        ↓
Visitor loads other product pages and adds to cart or edits cart and proceeds to checkout
        ↓
DataLayer push captures structured ecommerce event data
        ↓
GA4 receives event data for interaction tracking
        ↓
Visitor proceeds to purchase
        ↓
DataLayer push captures structured ecommerce event data
        ↓
GA4 receives event data for interaction tracking
```

## GTM Implementation
### Tags
| Tag | Type | Trigger |
|-----|------|---------|
| GA4 Init | Google Tag | All Pages — Initialization |
| add_to_cart Event| GA4 Event | add_to_cart |
| begin_checkout Event| GA4 Event | begin_checkout |
| purchase Event| GA4 Event | purchase |
| view_item Event| GA4 Event | view_item |

### Triggers
| Trigger | Type | Description |
|---------|------|-------------|
| add_to_cart | Custom Event | Listens for `add_to_cart` event name pushed to DataLayer |
| begin_checkout | Custom Event | Listens for `begin_checkout` event name pushed to DataLayer |
| purchase | Custom Event | Listens for `purchase` event name pushed to DataLayer |
| view_item | Page View | Fires on Page URL containing the `-product` |

### Key Variables
**Auto-collected (built-in):**
- Page URL, Page Path, Page Hostname — for page-level context
-Referrer — for link tracking
- Click URL, Click Text, Click ID, Click Classes — for click event detail
- Scroll Depth Threshold, Scroll Direction — for scroll tracking
- Error Message, Error Line, Error URL — for JS error tracking

**User-defined DataLayer variables:**

| Variable | Description |
|----------|-------------|
| dL_currency | Currency for transaction |
| dL_items | Array consisting of item details |
| dL_shipping | Shipping cost |
| dL_tax | Tax cost of order |
| dL_transaction_id | Purchase id |
| dL_value | Monetary value of the event — product price for view_item and add_to_cart, cart total for begin_checkout and purchase. |
| GA4 ID | Constant — GA4 Measurement ID |

## GA4 Event Schema

| Event Name | Trigger | Key Parameters |
|------------|---------|----------------|
| view_item Event | -product pages |currency, value, items |
| add_to_cart Event | Custom Event: add_to_cart | currency, value, items |
| begin_checkout Event | Custom Event: begin_checkout | currency, value, items |
| purchase | Custom Event: purchase | currency, value, items, transaction_id, tax, shipping |


## Challenges and Decisions
Dataset pattern over hardcoded JS objects — chose to store product data in HTML data-* attributes on a dedicated div element rather than duplicating values in JavaScript. This separates data from logic and mirrors how production implementations read from CMS-injected markup.
localStorage for cart persistence — with no backend available, localStorage was the only viable option for maintaining cart state across page navigation. Read-modify-write pattern implemented to handle quantity accumulation and duplicate item detection.
Client-side transaction ID generation — crypto.randomUUID() used in absence of a server. Guarded with a localStorage check to prevent regeneration on page refresh, mirroring the deduplication behavior of server-generated IDs.
Static tax and shipping — flat rates used due to no backend or location API. Documented as a production gap rather than an implementation error.
Custom Event triggers over click triggers in GTM — initially configured click-based triggers but corrected to Custom Event triggers that respond to dataLayer pushes. This ensures GTM fires after the dataLayer is populated, preventing empty parameter reads.
Single shared utils.js — cart logic centralized in one file accessed by all pages rather than duplicating read/write logic across scripts. Ensures consistency and easier maintenance.
Page load vs interaction event distinction — view_item, begin_checkout, and purchase fire on page load; only add_to_cart fires on user interaction. This mirrors GA4's intended event model.

## Tools Used
- Google Tag Manager
- Google Analytics 4 (GA4)
- JavaScript (ES6+)
- HTML / CSS
- GitHub / GitHub Pages
- USTORA Template


