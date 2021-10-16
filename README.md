# OCR for PDFs

<!-- toc start -->

## Table of contents

- [Introduction](#introduction)
- [Cost of usage](#cost-of-usage)
- [Input](#input)
- [Output](#output)

<!-- toc end -->

## Introduction

This actor extracts text from 

## Cost of usage

Ticketmaster Scraper is a free of charge actor but it requires [Apify Proxy](https://apify.com/proxy) to work properly. More specifically, it needs the [residential proxy](https://apify.com/pricing/proxy) as Ticketmaster's blocking policy is strict and it blocks datacenter proxies by default. Apart from the residential IPs cost, [compute units](https://apify.com/pricing/actors) are charged for running the actor at the Apify platform.

Ticketmaster Scraper is able to scrape 300 events per 1 request which keeps both compute units and residential proxy expenses very low.

### Residential proxies

You can use residential proxies if you subscribe to a paid [plan at the Apify platform](https://apify.com/pricing). Residential IPs are charged based on the transferred data so try to optimize the maximum number of events scraped with respect to [residential proxy pricing](https://apify.com/proxy?pricing=residential-ip#pricing). These proxies are only available to be run within actors on the Apify platform, not externally. If you're interested in using residential proxies for this scraper, contact `support@apify.com` via email or in-app chat to get the proxies enabled.

### Consumption units

The actor is able to scrape approximately **20,000 events for 1 CU**. However, you'll never consume the whole CU during 1 run due to Ticketmaster's max items limitation. When you scrape the maximum number of events per 1 run which is about 5000 items, it should cost about 1/4 CU.

## Number of results

Set the maximum number of scraped events using the `maxItems` input field. 

> **_NOTE:_**  Ticketmaster limits searched results to 5100 with 300 items per 1 page (17 pages). If you need to scrape more events, you'll have to create multiple more specific input configurations that give you fewer search results and then combine the results together.

## Use Cases

Ticketmaster is one of the leading companies in the field of event tickets purchasing. It comes with the nice search engine which helps you find the relevant events but it's missing a few features that can simplify the search process. Mainly the filtering of multiple categories and subcategories at once and also proper location specification. The events scraper can be useful e. g. in the following situations:

- **Personal monitoring of relevant events** - handy search filters, no need to browse the [Ticketmaster.com](https://www.ticketmaster.com/) website
- **Price analysis** - compare Ticketmaster's price offers to other ticket providers
- **Ticket availability monitoring** - set notifications to remind you the time when the relevant tickets are put up for sale
- **Events analysis by different criteria** (location, date range) - monitor which countries are missing the events of a specific category and fill this spot

## Input

Ticketmaster Scraper offers various settings for customized event searching. Some of them follow the standard [Ticketmaster.com](https://www.ticketmaster.com/) API, others are designed to extend the existing API by new features.

### Categories

First, check all event categories you want to scrape. Input categories are mapped on the categories at [Ticketmaster.com](https://www.ticketmaster.com/). You can choose from:

- **Concert** Events
- **Sport** Events
- **Arts & Theater** Events
- **Family** Events

>  **_NOTE:_**  Feel free to check multiple categories at once but keep in mind that Ticketmaster limits the maximum [number of results](#numberOfResults) it returns. So it might be a good idea to create a separate dataset for each category and only specify more subcategories. Or you could add more restrictive filter such as the exact location or date range.

### Subcategories

The actor provides the list of subcategories for each of the main categories. These subcategories are hidden in the collapsible sections and they represent different **disciplines** of Sport events and various **genres** of Concerts, Arts & Theater and Family events. When you leave all subcategories of the scraped category unchecked, the actor scrapes everything from the given category.

> **_NOTE:_**  Always check the category you want to scrape at the top of the input. If you only check the specific subcategories (genres or sport disciplines) without checking the corresponding category, the actor won't discover the subcategories you checked.

### Location

Specify a desired `country` in the form of [ISO Alpha-2 Country Code](https://www.iban.com/country-codes) or an exact geographical point by filling the `geohash` value. Depending on your needs, you can use both of these fields or just one of them. Last but not least, set the `distance` radius in mile units.

### Date

No date restrictions are set by default so all dates are scraped. If you wish to put some date restrictions, check `This Weekend` field or specify the date range. While setting the date range, you don't have to fill both `From` and `To` fields. If it suits you, fill one of them only. Inside the date section, `TBA` and `TBD` events filter is also handled. By choosing the appropriate value, you can exclude the events whose date is to be announced (TBA) or to be defined (TBD). Or you can go the other way round and include TBA and TBD events only. 

### Other

Apart from the previously mentioned fields, Ticketmaster Scraper also provides `Max Items` settings to limit the size of the result dataset. And to keep dataset processing simplified, it's able to sort the items by their date, relevance, distance or name.

## Output

The actor stores all scraped events in a dataset where each event is a separate item in the dataset. You can get the following information for each event:

- **id**
- **url**
- **name**
- **description**
- **segment name** (category)
- **genre name**
- **date** (title, subtitle)
- **location** (address, postal code, place url)
- **offer** (url, start date for ticket purchase, price)
- **performers** (list of performers with their name and url)

### Example dataset event item

```json
{
  "id": "vvG1YZpdLJK6fm",
  "url": "https://www.ticketmaster.com/mickey-gilley-and-johnny-lee-thackerville-oklahoma-10-25-2020/event/0C005837E64C752E",
  "name": "Mickey Gilley and Johnny Lee",
  "description": "Mickey Gilley and Johnny Lee | Sun 10/25 @ 3:00pm | Global Event Center at WinStar World Casino and Resort, Thackerville, OK",
  "segmentName": "Music",
  "genreName": "Country",
  "dateTitle": "Oct 25",
  "dateSubTitle": "Sun 3:00pm",
  "streetAddress": "777 Casino Avenue",
  "addressLocality": "Thackerville",
  "addressRegion": "OK",
  "postalCode": "73459",
  "addressCountry": "US",
  "placeUrl": "https://www.ticketmaster.com/global-event-center-at-winstar-world-casino-and-resort-tickets-thackerville/venue/99186",
  "offer": {
    "offerUrl": "https://www.ticketmaster.com/mickey-gilley-and-johnny-lee-thackerville-oklahoma-10-25-2020/event/0C005837E64C752E",
    "availabilityStarts": "",
    "price": "35",
    "priceCurrency": "USD"
  },
  "performers": [
    {
      "name": "Mickey Gilley",
      "url": "https://www.ticketmaster.com/mickey-gilley-tickets/artist/732778"
    },
    {
      "name": "Johnny Lee",
      "url": "https://www.ticketmaster.com/johnny-lee-tickets/artist/732830"
    }
  ]
}
```

