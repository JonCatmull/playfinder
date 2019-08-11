# Notes

- Location search
  - Add loading animation when find me is clicked
  - Add full screen step for location input
- Sport selection
  - Make full screen step 2
  - Use small tiles with icon for sport selection
  - On selection just to next step (pitches list)
  - Get sports list from API, I created a quick temporary method to scrape API and list Sports found. Obviously this should be changed to come from API.
- Pitches list
  - Add pagination or virtual scroll for pitches list
  - Add message or helpful links if nothing found
  - Add filters for distance, format, surface etc.
  - Improve styling
  - Add enter animations for list items
  - Add a map view option and plot pitches/venues
- Pitch (single view)
  - Generally improve/finish styling
  - Show more of the information (e.g. add google maps etc).
  - Improve display of slots, I used a plugin quickly to display but need time to check for better alternative or build custom component.
  - Improve logic for slots date filters, for testing defaults to January 2018 for use with pitch 32990 but this would be changed to today’s date. Also if keeping plugin then change to only have start date filter and to make default to load that week (Sunday to Sat) as the plugin used defaults to show current week (based on start date) regardless of start end date.

# General considerations
- Consider move to use NgRx and then enable onPush strategy.
- Add caching to api service.
- I ran out of time to write unit tests, obviously this would be a priority given more time.
