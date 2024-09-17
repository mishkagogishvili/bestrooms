/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/SearchPage` | `/(tabs)/active` | `/(tabs)/bookingDetails` | `/(tabs)/favorites` | `/(tabs)/settings` | `/SearchPage` | `/_sitemap` | `/active` | `/bookingDetails` | `/favorites` | `/settings` | `/ui/ActiveBookingContent` | `/ui/ActiveBookingHeader` | `/ui/AllImages` | `/ui/ChangeCurrency` | `/ui/ChangeCurrencyDrawer` | `/ui/ChangeCurrencyRadioBtn` | `/ui/ChangeLanguageRadioBtn` | `/ui/Checkout` | `/ui/Destinations` | `/ui/Drawer` | `/ui/GuestSelector(notUsed)` | `/ui/Header` | `/ui/HotelImages` | `/ui/HotelPage` | `/ui/ImagesView` | `/ui/LanguageSelectorDrawer` | `/ui/PastBookings` | `/ui/PopularDestinations` | `/ui/PremiumServiceImages` | `/ui/PremiumServiceImagesView` | `/ui/PremiumServiceImg` | `/ui/RecommendedRadioBtn` | `/ui/RoomImages` | `/ui/RoomImagesView` | `/ui/RoomPage` | `/ui/RoomPageImg` | `/ui/RoomsPage` | `/ui/Search` | `/ui/SearchFilters` | `/ui/SearchPageDrawer` | `/ui/SearchPageHeader` | `/ui/SearchPageTags` | `/ui/SearchResults` | `/ui/SearchResultsPage` | `/ui/SearchSuggestionCollapse` | `/ui/SearchSuggestions` | `/ui/SelectLanguage` | `/ui/StarRating` | `/ui/activitiesDetails` | `/ui/holder` | `/ui/mapHolder(dummydata)`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
