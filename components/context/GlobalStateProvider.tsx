// hotel info ეიპიაი ქოლი
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";

const GlobalContext = createContext();

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  // რენდომ სასტუმროები
  const [db, setDb] = useState([
    {
      id: 1,
      image: "../../assets/images/1.jpeg",
      name: "Levan & Giorgi Palace",
      rating: 5,
      reviews: 16,
      price: 25,
      cancelation: true,
      isFavorite: true,
      discount: "0",
      topDeal: false,
      booked: true,
      departure: "may 26th, 8:00 am",
      return: "may 26th, 9:00 pm",
      city: "Tbilisi",
      region: "Tbilisi",
      country: "Georgia",
      position: {
        lat: 41.716667,
        lng: 44.783333,
      },
    },
  ]);

  const [hotelList, setHotelList] = useState([]);
  const [hotelInfo, setHotelInfo] = useState([]);
  const [hotelRooms, setHotelRooms] = useState([]);
  const [hotelRoom, setHotelRoom] = useState([]);
  const [premiumService, setPremiumService] = useState([]);
  const [hotelId, setHotelId] = useState(1);
  const [roomId, setRoomId] = useState();
  const [serviceId, setServiceId] = useState();
  const [reservation, setReservation] = useState();
  const [searchResult, setSearchResult] = useState();
  const [language, setLanguage] = useState("ka");
  const [currency, setCurrency] = useState("gel");

  //  ChangeLanguage და ChangeCurrency სთეითები
  const [changeLanguage, setChangeLanguage] = useState("EN");
  const [changeCurrency, setChangeCurrency] = useState("usd");

  // hotel List ეიპიაი ქოლი
  useEffect(() => {
    const fetchHotelList = async () => {
      const response = await fetch(
        `https://bestrooms.app/api/hotels?lang=${language}&currency=${changeCurrency}`,
        {
          headers: {
            Accept: "application/json",
            "Access-control-allow-origin": "*",
          },
        }
      );
      const data = await response.json();
      setHotelList(data.data);
    };

    fetchHotelList();
  }, [language, changeCurrency]);

  // hotel info აიპია ქოლი
  useEffect(() => {
    const fetchHotelInfo = async () => {
      const response = await fetch(
        `https://bestrooms.app/api/hotels/${hotelId}?lang=${language}&currency=${changeCurrency}`,
        {
          headers: {
            Accept: "application/json",
            "Access-control-allow-origin": "*",
          },
        }
      );
      const data = await response.json();
      setHotelInfo(data);
    };

    fetchHotelInfo();
  }, [hotelId, language, changeCurrency]);

  // hotel room ეიპიაი ქოლი
  useEffect(() => {
    const fetchHotelRoom = async () => {
      const response = await fetch(
        `https://bestrooms.app/api/hotels/${hotelId}/rooms/${roomId}?lang=${language}&currency=${changeCurrency}`,
        {
          headers: {
            Accept: "application/json",
            "Access-control-allow-origin": "*",
          },
        }
      );
      const data = await response.json();
      setHotelRoom(data);
    };

    fetchHotelRoom();
  }, [hotelId, roomId, language, changeCurrency]);

  // პრემიუმ სერვისების ეიპიაი ქოლი
  useEffect(() => {
    const fetchPremiumServices = async () => {
      const response = await fetch(
        `https://bestrooms.app/api/hotels/premium-service/${serviceId}?lang=${language}&currency=${changeCurrency}`,
        {
          headers: {
            Accept: "application/json",
            "Access-control-allow-origin": "*",
          },
        }
      );
      const data = await response.json();
      setPremiumService(data);
    };

    fetchPremiumServices();
  }, [serviceId, language, changeCurrency]);

  // reservation ეიპიაი ქოლო
  useEffect(() => {
    const fetchReservation = async () => {
      const response = await fetch(
        `https://bestrooms.app/api/check-reservation/${roomId}?checkinDate=${search[0].check_in}&checkoutDate=${search[0].check_out}`,
        {
          headers: {
            Accept: "application/json",
            "Access-control-allow-origin": "*",
          },
        }
      );
      const data = await response.json();
      setReservation(data);
    };

    fetchReservation();
  }, [hotelId, roomId]);

  // add reservation რექვესტი

  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<any>(null);

  const handlePress = async () => {
    try {
      const response = await fetch(
        "https://bestrooms.app/api/hotels/reservation/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            from: startDate ? startDate : today.toISOString().slice(0, 10),
            to: endDate ? endDate : tomorrow.toISOString().slice(0, 10),
            room_id: roomId,
            price: 200.0,
            first_name: checkout.name,
            last_name: checkout.last_name,
            phone: checkout.mobile,
            email: checkout.email,
            adult: countAdults,
            kid: countChildren,
            currency: changeCurrency,
            transaction_id: "2dasd",
            country: "GE",
            lang: changeLanguage,
          }),
        }
      );

      const result = await response.json();
      setData(result);

      if (result.success) {
        // Navigate to the HotelPage with a message
        router.push(`/ui/HotelPage?id=${hotelId}&message=Order%20created`);
      } else {
        // Handle the case where the order was not created successfully
        console.error("Order creation failed:", result.message);
      }
    } catch (error) {
      console.error("Error during order creation:", error);
    }
  };

  //  ფორმის ვალიდაცია

  const [correctName, setCorrectName] = useState(true);
  const [correctLastName, setCorrectLastName] = useState(true);
  const [correctEmail, setCorrectEmail] = useState(true);
  const [correctPhoneNumber, setCorrectPhoneNumber] = useState(true);

  function nameValidation(text: string) {
    const hasNumber = /\d/;
    if (hasNumber.test(text)) {
      setCorrectName(false);
    } else {
      setCorrectName(true);
    }
  }
  function lastNameValidation(text: string) {
    const hasNumber = /\d/;
    if (hasNumber.test(text)) {
      setCorrectLastName(false);
    } else {
      setCorrectLastName(true);
    }
  }

  function emailValidation(text: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setCorrectEmail(emailRegex.test(text));
  }
  function phoneValidation(text: string) {
    const hasLettersEnglish = /[a-zA-Z]/;
    const hasLettersGeorgian = /[ა-ჰ]/;
    const hasLettersRussian = /[а-я]/;

    if (
      hasLettersEnglish.test(text) ||
      hasLettersGeorgian.test(text) ||
      hasLettersRussian.test(text)
    ) {
      setCorrectPhoneNumber(false);
    } else {
      setCorrectPhoneNumber(true);
    }
  }

  // ფავორიტების  ფუნქცია
  function toggleFavorite(id) {
    setDb((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isFavorite: !card.isFavorite } : card
      )
    );
  }

  // რეიტინგის დასააფდეითბელი ფუნქცია
  const updateRating = (id, newRating) => {
    setDb((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, rating: newRating } : card
      )
    );
  };
  const [userRating, setUserRating] = useState(hotelList.star_rating);

  // აქტიური ღილაკი active გვერდზე
  const [activeBtn, setActiveBtn] = useState("1");

  function activeButton(number) {
    setActiveBtn(number);
  }

  //  კალენდარის drawer ფუნქციები
  const openCalendarDrawer = useRef(null);
  const handleOpenCalendarDrawer = () => {
    if (openCalendarDrawer.current) {
      openCalendarDrawer.current(); // Trigger the function to open the drawer
    }
  };

  const handleCloseCalendarDrawer = () => {
    if (openCalendarDrawer.current) {
      openCalendarDrawer.current?.close();
    }
  };

  //  drawer ის ფუნქციის სთეითები
  const [countAdults, setCountAdults] = useState(1);
  const [countChildren, setCountChildren] = useState(0);

  const bottomSheetRef = useRef(null);

  const snapPoints = ["40%", "50%"];

  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  );

  // კალენდარის ფუნქციები

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});

  const handleDayPress = (day) => {
    const selectedDate = day.dateString;

    if (!startDate) {
      // Set start date
      setStartDate(selectedDate);
      setEndDate(null); // Clear end date
      setMarkedDates({
        [selectedDate]: {
          selected: true,
          selectedColor: "black",
          selectedTextColor: "white",
          borderRadius: 4,
        },
      });
    } else if (!endDate) {
      // Set end date
      setEndDate(selectedDate);
    } else {
      // Reset selection
      setStartDate(selectedDate);
      setEndDate(null);
      setMarkedDates({
        [selectedDate]: {
          selected: true,
          customStyles: {
            container: { backgroundColor: "black", borderRadius: 4 }, // Square background
            text: { color: "white" },
          },
        },
      });
    }
  };

  // This useEffect will run whenever startDate or endDate changes
  useEffect(() => {
    if (startDate && endDate) {
      const updatedMarkedDates = { ...markedDates };
      const datesRange = getDatesInRange(startDate, endDate);

      datesRange.forEach((date) => {
        updatedMarkedDates[date] = {
          selected: true,
          customStyles: {
            container: { backgroundColor: "#F5F5F5", borderRadius: 4 }, // Square background
            text: { color: "white" },
          },
        };
      });

      // Mark start and end dates
      updatedMarkedDates[startDate] = {
        selected: true,
        customStyles: {
          container: { backgroundColor: "black", borderRadius: 4 }, // Square background
          text: { color: "white" },
        },
      };
      updatedMarkedDates[endDate] = {
        selected: true,
        customStyles: {
          container: { backgroundColor: "black", borderRadius: 4 }, // Square background
          text: { color: "white" },
        },
      };

      setMarkedDates(updatedMarkedDates);
    }
  }, [startDate, endDate]); // Dependency array includes startDate and endDate

  const getDatesInRange = (start, end) => {
    const dates = [];
    let currentDate = new Date(start);
    const endDate = new Date(end);

    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  // Function to format startDate and endDate if they exist
  const getFormattedDate = (dateString) => {
    if (!dateString) return null;
    const dateObject = new Date(dateString);
    return formatDate(dateObject);
  };

  const formattedStartDate = getFormattedDate(startDate);
  const formattedEndDate = getFormattedDate(endDate);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formattedToday = formatDate(today);
  const formattedTomorrow = formatDate(tomorrow);

  const getTotalDaysCount = () => {
    if (!startDate || !endDate) return 1;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffInMs = end - start;

    const totalDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;

    return totalDays;
  };

  const totalDays = getTotalDaysCount();

  // Recommended სთეითი
  const [recommendedVisible, setRecommendedVisible] = useState(false);
  const [backAlertVisible, setBackAlertVisible] = useState(false);

  const [recommendedOptions, setRecommendedOptions] = useState("Recommended");

  // RoomPage ში ენის და ვალუტის ფანჯრის სთეითი
  const [showChangeContent, setShowChangeContent] = useState(0);
  const [showChange, setShowChange] = useState(false);

  const openDrawerCurrency = useRef(null);
  const openDrawerLanguage = useRef(null);

  function toggleChange() {
    setShowChange(!showChange);

    if (!showChange) {
      setShowChangeContent(0);
    }
  }
  function closeChange() {
    setShowChange(false);
  }
  function showChangeContentFunction(index) {
    setShowChangeContent(index);
  }

  const handleOpenCurrencyDrawer = () => {
    if (openDrawerCurrency.current) {
      openDrawerCurrency.current(); // Trigger the function to open the drawer
    }
  };
  const handleOpenLanguageDrawer = () => {
    if (openDrawerLanguage.current) {
      openDrawerLanguage.current(); // Trigger the function to open the drawer
    }
  };

  //  ძებნა
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [Suggestions, setSuggestions] = useState("");

  const [search, setSearch] = useState([
    {
      destination: "",
      check_in: "",
      check_out: "",
      adults: 0,
      children: 0,
    },
  ]);

  // search ეიპიაი ქოლო
  useEffect(() => {
    const fetchSearch = async () => {
      const response = await fetch(
        `https://bestrooms.app/api/search?searchPhrase=${search[0].destination}&checkinDate=${search[0].check_in}&checkoutDate=${search[0].check_out}&adults=${search[0].adults}&children=${search[0].children}&lang=${language}&currency=${changeCurrency}&per_page=10`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setSearchResult(data);
    };

    fetchSearch();
  }, [search, language, changeCurrency]);

  useEffect(() => {
    setSearch([
      {
        destination: searchQuery,
        check_in: formattedStartDate ? formattedStartDate : formattedToday,
        check_out: formattedEndDate ? formattedEndDate : formattedTomorrow,
        adults: countAdults,
        children: countChildren,
      },
    ]);
  }, [
    searchQuery,
    formattedStartDate,
    formattedEndDate,
    countAdults,
    countChildren,
  ]);

  // Checkout form

  const [checkout, setCheckout] = useState([
    {
      name: "",
      last_name: "",
      email: "",
      mobile: "",
      custom_text: "",
    },
  ]);

  // რუკა

  const [region, setRegion] = useState({
    latitude: 42.1500663,
    longitude: 42.2828209,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
  });

  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

  const [callingCode, setCallingCode] = useState("");
  const [countryCode, setCountryCode] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        db,
        formattedStartDate,
        formattedEndDate,
        setDb,
        search,
        searchResult,
        reservation,
        hotelList,
        setHotelList,
        hotelInfo,
        hotelRooms,
        hotelRoom,
        hotelId,
        setHotelId,
        roomId,
        setRoomId,
        serviceId,
        setServiceId,
        premiumService,
        toggleFavorite,
        userRating,
        setUserRating,
        updateRating,
        activeBtn,
        setActiveBtn,
        activeButton,
        searchText,
        setSearchText,
        searchQuery,
        setSearchQuery,
        Suggestions,
        setSuggestions,
        openCalendarDrawer,
        handleOpenCalendarDrawer,
        handleCloseCalendarDrawer,
        formattedToday,
        formattedTomorrow,
        totalDays,
        markedDates,
        handleDayPress,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        setMarkedDates,
        bottomSheetRef,
        snapPoints,
        handleOpenBottomSheet,
        renderBackdrop,
        countAdults,
        countChildren,
        setCountAdults,
        setCountChildren,
        changeLanguage,
        setChangeLanguage,
        changeCurrency,
        setChangeCurrency,
        recommendedOptions,
        setRecommendedOptions,
        recommendedVisible,
        setRecommendedVisible,
        backAlertVisible,
        setBackAlertVisible,
        showChangeContent,
        setShowChangeContent,
        showChange,
        setShowChange,
        toggleChange,
        closeChange,
        showChangeContentFunction,
        handleOpenCurrencyDrawer,
        handleOpenLanguageDrawer,
        setLanguage,
        openDrawerCurrency,
        openDrawerLanguage,
        checkout,
        setCheckout,
        handlePress,
        data,
        region,
        setRegion,
        selectedMarker,
        setSelectedMarker,
        handleMarkerPress,
        correctName,
        setCorrectName,
        correctLastName,
        setCorrectLastName,
        correctEmail,
        setCorrectEmail,
        correctPhoneNumber,
        setCorrectPhoneNumber,
        nameValidation,
        lastNameValidation,
        emailValidation,
        phoneValidation,
        callingCode,
        setCallingCode,
        countryCode,
        setCountryCode,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the GlobalContext
export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
