export type Language = 'en' | 'ua';

export const translations = {
  en: {
    common: {
      uah: "UAH",
      processing: "Processing...",
      location: "Location",
    },
    hero: {
      premiumExperience: "Premium Coffee Experience",
      elevateTitle: "Elevate Your",
      elevateSubtitle: "Morning Ritual",
      description: "Artisanal coffee brewed to perfection, served from our window to your hands. Experience the gold standard of on-the-go caffeine.",
      exploreButton: "Explore Our Story",
    },
    story: {
      badge: "The Bean & The Craft",
      titlePart1: "Single Origin.",
      titlePart2: "Served Through a Window.",
      paragraph1: "We source our beans directly from sustainable farms in Ethiopia and El Salvador. By utilizing micro-lot selections and meticulous anaerobic fermentation processing, every cup delivers tasting notes that challenge expectations.",
      paragraph2: "Our window conceptualizes speed without sacrificing luxury. No indoor distractions—just uncompromising, artisanal coffee geometry engineered for city movement. Meet your barista, take your cup, and elevate your urban journey.",
      arabicaSpecialty: "100%",
      microLotSourcing: "Micro",
      specialtyLabel: "Arabica Specialty",
      sourcingLabel: "Lot Sourcing",
    },
    menu: {
      title: "Curated",
      subtitle: "Selections",
      description: "Every brew and pastry is a testament to our dedication to the gold standard of coffee culture.",
      categories: {
        all: "All",
        espresso: "Espresso",
        filter: "Filter",
        signature: "Signature",
        bakery: "Bakery",
      },
      addToOrder: "Add to Order",
    },
    order: {
      badge: "Your Order",
      titlePart1: "Curate Your",
      titlePart2: "Ritual",
      orderConfirmed: "Order Confirmed",
      successDescription: "Thank you. Your espresso extraction has been successfully scheduled. Please present your name at the window upon arrival.",
      returnToMenu: "Return to Menu",
      emptyCart: "Your premium cup is currently empty.",
      emptyCartSub: "Explore the menu above to select your single-origin extraction.",
      selectedItems: "Selected Items",
      windowDispatch: "Window Dispatch",
      inputName: "Your Name",
      inputPhone: "+380 DD MMM MM MM",
      inputTime: "HH:MM (e.g., 14:30)",
      subtotal: "Subtotal",
      serviceFee: "Window Service Fee",
      complimentary: "Complimentary",
      totalCost: "Total Ritual Cost",
      secureOrderButton: "Secure Window Order",
    },
    location: {
      badge: "Location",
      titlePart1: "Find the",
      titlePart2: "Window",
      windowName: "The Extraction Window",
      address: "Sofiivska St, 23, Kyiv, 01001",
      dispatchHours: "Dispatch Hours",
      openInMaps: "Open in Google Maps",
      // New clean synchronized architecture tokens
      description: "Visit our minimalist extraction window nestled in the heart of the city. Experience elite espresso brewing crafted for modern movement.",
      addressTitle: "Coordinates",
      addressValue: "Mazepy Ave, Vyshhorod, Kyiv Oblast, 07300",
      hoursTitle: "Dispatch Window",
      hoursValue: "Mon - Sun: 08:00 - 20:00",
      phoneTitle: "Hotline Sequence",
    },
    menuItems: {
      e1: {
        name: "Single Origin Espresso",
        description: "Anaerobic fermentation beans with notes of wild berries and cacao.",
      },
      e2: {
        name: "Luxury Flat White",
        description: "Silky microfoam over a double shot of our premium house roast.",
      },
      f1: {
        name: "V60 Pour Over",
        description: "Clean and complex profile from rotating seasonal microlots.",
      },
      s1: {
        name: "Golden Oat Latte",
        description: "Turmeric-infused oat milk with a hint of black pepper and honey.",
      },
      s2: {
        name: "Smoked Vanilla Cold Brew",
        description: "12-hour steep with bourbon vanilla and a touch of hickory smoke.",
      },
      b1: {
        name: "Gold Leaf Croissant",
        description: "Triple-laminated, butter-rich pastry with a light honey glaze.",
      },
      b2: {
        name: "Salted Caramel Cruffin",
        description: "A hybrid masterpiece filled with artisanal salted caramel cream.",
      },
    },
  },
  ua: {
    common: {
      uah: "грн",
      processing: "Обробка...",
      location: "Локація",
    },
    hero: {
      premiumExperience: "Преміальна кавова культура",
      elevateTitle: "Вдоскональте свій",
      elevateSubtitle: "Ранковий ритуал",
      description: "Рецептурна кава, доведена до досконалості, що подається з нашого вікна прямо у ваші руки. Відчуйте золотий стандарт кофеїну в русі.",
      exploreButton: "Відкрийте нашу історію",
    },
    story: {
      badge: "Зерно та майстерність",
      titlePart1: "Single Origin.",
      titlePart2: "Крізь вікно до ваших рук.",
      paragraph1: "Ми обираємо зерно безпосередньо з екологічних ферм Ефіопії та Сальвадору. Завдяки використанню мікролотів та ретельній анаеробній ферментації, кожна чашка розкриває смаковий профіль, що перевершує очікування.",
      paragraph2: "Наш формат поєднує швидкість без компромісів у розкоші. Жодних зайвих деталей — лише бездоганна геометрія кавового мистецтва, створена для міського ритму. Зустріньте свого бариста та вдоскональте свою подорож містом.",
      arabicaSpecialty: "100%",
      microLotSourcing: "Micro",
      specialtyLabel: "Specialty Арабіка",
      sourcingLabel: "Прямий імпорт",
    },
    menu: {
      title: "Вишукана",
      subtitle: "Колекція",
      description: "Кожна чашка та кожен виріб пекарні — це наше свідчення відданості золотому стандарту кавової культури.",
      categories: {
        all: "Все",
        espresso: "Еспресо",
        filter: "Фільтр",
        signature: "Авторські",
        bakery: "Випічка",
      },
      addToOrder: "Додати до замовлення",
    },
    order: {
      badge: "Ваше замовлення",
      titlePart1: "Створіть свій",
      titlePart2: "Ритуал",
      orderConfirmed: "Замовлення підтверджено",
      successDescription: "Дякуємо. Ваша екстракція еспресо успішно запланована. Будь ласка, назвіть своє ім'я біля вікна після прибуття.",
      returnToMenu: "Повернутися до меню",
      emptyCart: "Ваша преміальна чашка наразі порожня.",
      emptyCartSub: "Ознайомтеся з меню вище, щоб обрати свою ідеальну екстракцію.",
      selectedItems: "Обрані позиції",
      windowDispatch: "Видача з вікна",
      inputName: "Ваше ім'я",
      inputPhone: "+380 DD MMM MM MM",
      inputTime: "ЧЧ:ХХ (напр., 14:30)",
      subtotal: "Сума",
      serviceFee: "Сервіс вікна",
      complimentary: "Безкоштовно",
      totalCost: "Вартість ритуалу",
      secureOrderButton: "Підтвердити замовлення",
    },
    location: {
      badge: "Локація",
      titlePart1: "Знайдіть",
      titlePart2: "Вікно",
      windowName: "Вікно Екстракції",
      address: "вул. Софіївська, 23, Київ, 01001",
      dispatchHours: "Години роботи",
      openInMaps: "Відкрити в Google Maps",
      // New clean synchronized architecture tokens
      description: "Завітайте до нашого мінімалістичного вікна екстракції кави в самому серці міста. Відчуйте елітне заварювання еспресо, створене для сучасного міського руху.",
      addressTitle: "Координати",
      addressValue: "проспект Мазепи, Вишгород, Київська область, 07300",
      hoursTitle: "Вікно видачі",
      hoursValue: "Пн - Нд: 08:00 - 20:00",
      phoneTitle: "Гаряча лінія",
    },
    menuItems: {
      e1: {
        name: "Single Origin Еспресо",
        description: "Зерна анаеробної ферментації з нотами диких ягід та какао.",
      },
      e2: {
        name: "Luxury Флет Вайт",
        description: "Шовковиста мікропіна на подвійній порції нашого преміального обсмаження.",
      },
      f1: {
        name: "V60 Pour Over",
        description: "Чистий та складний смаковий профіль із сезонних мікролотів.",
      },
      s1: {
        name: "Golden Oat Лате",
        description: "Вівсяне молоко з куркумою, дрібкою чорного перцю та медом.",
      },
      s2: {
        name: "Smoked Vanilla Колд Брю",
        description: "12-годинне настоювання з бурбонською ваніллю та відтінком диму гікорі.",
      },
      b1: {
        name: "Золотий круасан",
        description: "Потрійна ламінація, багато вершкового масла та легка медова глазур.",
      },
      b2: {
        name: "Солоний карамельний крафін",
        description: "Гібридний шедевр, наповнений крафтовим кремом із солоної карамелі.",
      },
    },
  },
};

export type TranslationKeys = typeof translations.en;

export type TranslationPath =
  | `common.${keyof TranslationKeys['common']}`
  | `hero.${keyof TranslationKeys['hero']}`
  | `story.${keyof TranslationKeys['story']}`
  | `menu.${Exclude<keyof TranslationKeys['menu'], 'categories'>}`
  | `menu.categories.${keyof TranslationKeys['menu']['categories']}`
  | `order.${keyof TranslationKeys['order']}`
  | `location.${keyof TranslationKeys['location']}`
  | `menuItems.${string}.name`
  | `menuItems.${string}.description`;