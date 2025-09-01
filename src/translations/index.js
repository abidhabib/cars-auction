import { steps } from "framer-motion";

export const translations = {
  en: {
    languageName: "English",
    // Header
    header: {
      mainMenu: {
        home: "Home",
        buyCars: "Buy Cars",
        sellCars: "Sell Cars",
        aboutUs: "About Us",
        contact: "Contact",
        help: "Help"
      },
      buyMenu: {
        browseInventory: "Browse Inventory",
        directBuy: "Direct Buy",
        auctions: "Auctions"
      },
      sellMenu: {
        sellYourCar: "Sell Your Car",
        pricingGuide: "Pricing Guide",
        evaApp: "EVA App"
      },
      userMenu: {
        dashboard: "Dashboard",
        profile: "Profile"
      },
      language: "Language",
      welcome: "Welcome"
    },
    navigation: {
      buyCars: "Buy cars",
      sellCars: "Sell cars",
      company: "Company",
      aboutUs: "About us",
      jobs: "Jobs",
      dataPrivacy: "Data privacy",
      termsConditions: "T&C",
      imprint: "Imprint",
      newsPress: "News & press",
      login: "Log in",
      signup: "Sign up"
    },
    // Hero Section
    hero: {
      title: "Europe's largest wholesale platform for used cars",
      buySection: {
        title: "Buy Cars",
        points: [
          "3,000+ cars added daily",
          "30,000+ cars in stock",
          "Reliable documentation of car condition"
        ],
        cta: "Start Buying"
      },
      sellSection: {
        title: "Sell Cars",
        points: [
          "Sell within 24 hours for the highest prices",
          "Full transport and document handling",
          "60,000+ dealers bid on your car"
        ],
        cta: "Start Selling"
      }
    },
    // Success Stories
    successStories: {
      title: "Success Stories",
      subtitle: "Discover how dealers like you are growing their businesses with CarNetwork",
      stories: [
        {
          name: "Sarah Mitchell",
          description: "Increased sales by 150% in 6 months"
        },
        {
          name: "James Wilson",
          description: "Modernized dealership operations"
        },
        {
          name: "Emily Rodriguez",
          description: "Expanded to 3 new locations"
        },
        {
          name: "Michael Chang",
          description: "Doubled customer satisfaction rate"
        },
        {
          name: "Lisa Thompson",
          description: "Revolutionized online sales process"
        },
        {
          name: "David Parker",
          description: "Achieved record-breaking growth"
        },
        {
          name: "Amanda Foster",
          description: "Leading digital transformation"
        },
        {
          name: "Robert Chen",
          description: "Pioneer in electric vehicle sales"
        }
      ]
    },
    // Daily Cars Section
    dailyCars: {
      title: "More than 3,000 cars added daily",
      activeStatus: "Active",
      addedToday: "Added today"
    },
    // Business Growth Section
    businessGrowth: {
      title: "Grow your business with CarNetwork",
      description: "CarNetwork is Europe's largest wholesale platform for used cars. We support your business growth with digital buying and selling solutions, best-in-class transport solutions and dedicated account managers.",
      learnMore: "Learn More",
      contactUs: "Contact Us",
      watchStory: "Watch our story"
    },
    // Common
    common: {
      loading: "Loading...",
      error: "Something went wrong",
      tryAgain: "Try again",
      startBuying: "Start buying",
      startSelling: "Start selling",
      googlePlay: "Google Play",
      appStore: "App Store"
    },
    // Info Sections
    info: {
      business: {
        title: "Grow your business with CarNetwork",
        description: "CarNetwork.com is Europe's largest wholesale platform for used cars. We support your business growth with digital buying and selling solutions, best-in-class Europe-wide transport solutions and dedicated account managers.",
        stats: {
          partners: "Partners",
          inventory: "Cars in stock",
          daily: "Cars added daily"
        }
      },
      buying: {
        title: "Buying cars with CarNetwork",
        description: "Get access to Europe-wide inventory and choose from over 30,000 cars in stock and 3,000 new cars added daily! Buy cars fast and easy entirely online and without time-consuming physical auctions, minimum purchase quantities, or hidden fees."
      },
      selling: {
        title: "Selling cars with CarNetwork",
        description: "Sell cars that do not fit in your portfolio easily, and entirely online to 60,000 dealers. Achieve the highest prices and digitize your trade-ins with CarNetwork EVA app."
      }
    },
    // Authentication
    profile: {
      personalInfo: "Personal Information",
      businessInfo: "Business Information",
      addressInfo: "Address Information",
      accountSettings: "Account Settings",
      accountStatus: "Account Status",
      editProfile: "Edit Profile",
      changePassword: "Change Password",
      memberSince: "Member Since",
      accountType: "Account Type",
      dealer: "Dealer",
      verificationStatus: "Verification Status",
      verified: "Verified",
      notVerified: "Not Verified",
      save:"Save",
      cancel:"Cancel",
      currentPassword:"Current Password",
      newPassword:"New Password",
      confirmPassword:"Confirm Password",
      logout: "Logout",
      error: "Error",
      retry: "Retry",
      saving: "Saving...",
      changing: "Changing...",
      updateError: "Update failed. Please try again.",
      passwordChangeSuccess: "Password changed successfully.",
      errors: {
        currentPasswordRequired: "Current password is required.",
        newPasswordRequired: "New password is required.",
        confirmPasswordRequired: "Confirm password is required.",
        passwordsDontMatch: "Passwords do not match.",
        passwordTooShort: "Password must be at least 8 characters."
      }

    },
    auth: {
      login: {
        title: "Welcome back",
        subtitle: "Sign in to your account",
        email: "Email address",
        password: "Password",
        rememberMe: "Remember me",
        forgotPassword: "Forgot password?",
        signIn: "Sign in",
        noAccount: "Don't have an account?",
        createAccount: "Create an account",
        errors: {
          invalidCredentials: "Invalid email or password",
          required: "This field is required",
          invalidEmail: "Please enter a valid email address"
        }
      },
      register: {
        title: "Create your account",
        subtitle: "Join Europe's largest car marketplace",
        step1: "Personal Information",
        step2: "Business Information",
        step3: "Address Information",
        step4: "Account Security",
        step5: "Shareholders Information",
        personalInfo: "Personal Information",
        personalInfoDesc: "Tell us about yourself",
        businessInfo: "Business Information",
        businessInfoDesc: "Tell us about your company",
        addressInfo: "Address Information",
        addressInfoDesc: "Where are you located?",
        accountSecurity: "Account Security",
        accountSecurityDesc: "Create a secure password",
        firstName: "First name",
        lastName: "Last name",
        email: "Email address",
        phone: "Phone number",
        companyName: "Company name",
         shareholdersInfo: "Shareholders Information",
      shareholdersInfoDesc: "Please provide details of all shareholders and upload identification documents",
      shareholder: "Shareholder",
      shareholderFullName: "Full Name",
      shareholderIdUpload: "Identification Document",
      enterFullName: "Enter full name",
      uploadFile: "Upload a file",
      dragAndDrop: "or drag and drop",
      fileTypes: "PNG, JPG, PDF up to 10MB",
      addAnotherShareholder: "Add Another Shareholder",
      removeLastShareholder: "Remove Last",
        vatNumber: "VAT number",
        UBO: "Ultimate Beneficial Owner number",
        street: "Street address",
        city: "City",
        postalCode: "Postal code",
        country: "Country",
        selectCountry: "Select a country",
        password: "Password",
        confirmPassword: "Confirm password",
        acceptTerms: "I accept the",
        termsAndConditions: "Terms and Conditions",
        acceptPrivacy: "I accept the",
        privacyPolicy: "Privacy Policy",
        acceptMarketing: "I want to receive marketing communications",
        createAccount: "Create account",
        alreadyHaveAccount: "Already have an account?",
        loginHere: "Login here",
        step1: "Personal",
        step1Desc: "About you",
        step2: "Business",
        step2Desc: "Your company",
        step3: "Address",
        step3Desc: "Location",
        step4: "Security",
        step5: "Shareholders",
        step4Desc: "Password",
        
        errors: {
          firstNameRequired: "First name is required",
          lastNameRequired: "Last name is required",
          emailRequired: "Email is required",
          emailInvalid: "Please enter a valid email address",
          phoneRequired: "Phone number is required",
          companyNameRequired: "Company name is required",
          vatNumberRequired: "VAT number is required",
          UBORequired: "Ultimate Beneficial Owner number is required",
          streetRequired: "Street address is required",
          cityRequired: "City is required",
          postalCodeRequired: "Postal code is required",
          countryRequired: "Country is required",
          passwordRequired: "Password is required",
          passwordTooShort: "Password must be at least 8 characters",
          confirmPasswordRequired: "Please confirm your password",
          passwordsDoNotMatch: "Passwords do not match",
          termsRequired: "You must accept the terms and conditions",
          privacyRequired: "You must accept the privacy policy",
          registrationFailed: "Registration failed. Please try again.",
          shareholderNameRequired: "Shareholder name is required",
          shareholderIdRequired: "Shareholder ID is required"
        }
      }
    }
  },
  de: {
    languageName: "Deutsch",
    // Header
    header: {
      mainMenu: {
        home: "Startseite",
        buyCars: "Autos kaufen",
        sellCars: "Autos verkaufen",
        aboutUs: "Über uns",
        contact: "Kontakt",
        help: "Hilfe"
      },
      buyMenu: {
        browseInventory: "Bestand durchsuchen",
        directBuy: "Direktkauf",
        auctions: "Auktionen"
      },
      sellMenu: {
        sellYourCar: "Ihr Auto verkaufen",
        pricingGuide: "Preisführer",
        evaApp: "EVA App"
      },
      userMenu: {
        dashboard: "Dashboard",
        profile: "Profil"
      },
      language: "Sprache",
      welcome: "Willkommen"
    },
    navigation: {
      buyCars: "Autos kaufen",
      sellCars: "Autos verkaufen",
      company: "Unternehmen",
      aboutUs: "Über uns",
      jobs: "Karriere",
      dataPrivacy: "Datenschutz",
      termsConditions: "AGB",
      imprint: "Impressum",
      newsPress: "News & Presse",
      login: "Anmelden",
      signup: "Registrieren"
    },
    // Hero Section
    hero: {
      title: "Europas größte Großhandelsplattform für Gebrauchtwagen",
      buySection: {
        title: "Autos kaufen",
        points: [
          "Täglich 3.000+ neue Autos",
          "30.000+ Autos auf Lager",
          "Zuverlässige Dokumentation des Fahrzeugzustands"
        ],
        cta: "Jetzt kaufen"
      },
      sellSection: {
        title: "Autos verkaufen",
        points: [
          "Verkaufen Sie innerhalb von 24 Stunden zum Höchstpreis",
          "Komplette Transport- und Dokumentenabwicklung",
          "60.000+ Händler bieten auf Ihr Auto"
        ],
        cta: "Jetzt verkaufen"
      }
    },
    // Success Stories
    successStories: {
      title: "Erfolgsgeschichten",
      subtitle: "Entdecken Sie, wie Händler wie Sie ihr Geschäft mit CarNetwork ausbauen",
      stories: [
        {
          name: "Sarah Mitchell",
          description: "Umsatzsteigerung um 150% in 6 Monaten"
        },
        {
          name: "James Wilson",
          description: "Modernisierung des Händlerbetriebs"
        },
        {
          name: "Emily Rodriguez",
          description: "Expansion auf 3 neue Standorte"
        },
        {
          name: "Michael Chang",
          description: "Verdoppelte Kundenzufriedenheit"
        },
        {
          name: "Lisa Thompson",
          description: "Revolutionierung des Online-Verkaufsprozesses"
        },
        {
          name: "David Parker",
          description: "Rekordbrechendes Wachstum erreicht"
        },
        {
          name: "Amanda Foster",
          description: "Führend in der digitalen Transformation"
        },
        {
          name: "Robert Chen",
          description: "Pionier im Elektroauto-Verkauf"
        }
      ]
    },
    // Daily Cars Section
    dailyCars: {
      title: "Täglich über 3.000 neue Autos",
      activeStatus: "Aktiv",
      addedToday: "Heute hinzugefügt"
    },
    // Business Growth Section
    businessGrowth: {
      title: "Entwickeln Sie Ihr Geschäft mit CarNetwork",
      description: "CarNetwork ist Europas größte Großhandelsplattform für Gebrauchtwagen. Wir unterstützen Ihr Geschäftswachstum mit digitalen Kauf- und Verkaufslösungen, erstklassigen Transportlösungen und persönlichen Account Managern.",
      learnMore: "Mehr erfahren",
      contactUs: "Kontakt",
      watchStory: "Unsere Geschichte ansehen"
    },
    // save
    common: {
      loading: "Wird geladen...",
      error: "Etwas ist schief gelaufen",
      tryAgain: "Erneut versuchen",
      startBuying: "Jetzt kaufen",
      startSelling: "Jetzt verkaufen",
      googlePlay: "Google Play",
      appStore: "App Store"
    },
    // Info Sections
    info: {
      business: {
        title: "Entwickeln Sie Ihr Geschäft mit CarNetwork",
        description: "CarNetwork.com ist Europas größte Großhandelsplattform für Gebrauchtwagen. Wir unterstützen Ihr Geschäftswachstum mit digitalen Kauf- und Verkaufslösungen, erstklassigen europaweiten Transportlösungen und persönlichen Account Managern.",
        stats: {
          partners: "Partner",
          inventory: "Autos auf Lager",
          daily: "Täglich neue Autos"
        }
      },
      buying: {
        title: "Autos kaufen mit CarNetwork",
        description: "Erhalten Sie Zugang zu europaweitem Bestand und wählen Sie aus über 30.000 Autos auf Lager und 3.000 täglich neuen Autos! Kaufen Sie Autos schnell und einfach komplett online und ohne zeitaufwändige physische Auktionen, Mindestabnahmemengen oder versteckte Gebühren."
      },
      selling: {
        title: "Autos verkaufen mit CarNetwork",
        description: "Verkaufen Sie Autos, die nicht in Ihr Portfolio passen, einfach und komplett online an 60.000 Händler. Erzielen Sie die höchsten Preise und digitalisieren Sie Ihre Inzahlungnahmen mit der CarNetwork EVA App."
      }
    },
    // Authentication
    profile: {
      personalInfo: "Persönliche Informationen",
      businessInfo: "Geschäftsinformationen",
      addressInfo: "Adressinformationen",
      accountSettings: "Kontoeinstellungen",
      accountStatus: "Kontostatus",
      editProfile: "Profil bearbeiten",
      changePassword: "Passwort ändern",
      memberSince: "Mitglied seit",
      accountType: "Kontotyp",
      dealer: "Händler",
      verificationStatus: "Verifizierungsstatus",
      verified: "Verifiziert",
      notVerified: "Nicht verifiziert",
      save:"Speichern",
      cancel:"Abbrechen",
      currentPassword:"Aktuelles Passwort",
      newPassword:"Neues Passwort",
      confirmPassword:"Passwort bestätigen",
      logout: "Ausloggen",
      error: "Fehler",
      retry: "Erneut versuchen",
      saving: "Speichern...",
      updateError: "Aktualisierung fehlgeschlagen. Bitte erneut versuchen.",
      passwordChangeSuccess: "Passwort erfolgreich geändert.",
      errors: {
        currentPasswordRequired: "Aktuelles Passwort ist erforderlich.",
        newPasswordRequired: "Neues Passwort ist erforderlich.",
        confirmPasswordRequired: "Passwort bestätigen ist erforderlich.",
        passwordsDontMatch: "Passwörter stimmen nicht überein.",
        passwordTooShort: "Das Passwort muss mindestens 8 Zeichen lang sein."
      }

    },
    auth: {
      login: {
        title: "Willkommen zurück",
        subtitle: "Melden Sie sich bei Ihrem Konto an",
        email: "E-Mail-Adresse",
        password: "Passwort",
        rememberMe: "Angemeldet bleiben",
        forgotPassword: "Passwort vergessen?",
        signIn: "Anmelden",
        noAccount: "Noch kein Konto?",
        createAccount: "Konto erstellen",
        errors: {
          invalidCredentials: "Ungültige E-Mail oder Passwort",
          required: "Dieses Feld ist erforderlich",
          invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
          
        }
      },
      register: {
        title: "Konto erstellen",
        subtitle: "Treten Sie Europas größtem Automarktplatz bei",
        step1: "Persönliche Informationen",
        step2: "Geschäftsinformationen",
        step3: "Adressinformationen",
        step4: "Kontosicherheit",
        step5: "Aandeelhouders",
        personalInfo: "Persönliche Informationen",
        personalInfoDesc: "Erzählen Sie uns etwas über sich",
        businessInfo: "Geschäftsinformationen",
        businessInfoDesc: "Erzählen Sie uns etwas über Ihr Unternehmen",
        addressInfo: "Adressinformationen",
        addressInfoDesc: "Wo befinden Sie sich?",
        accountSecurity: "Kontosicherheit",
        accountSecurityDesc: "Erstellen Sie ein sicheres Passwort",
        firstName: "Vorname",
        lastName: "Nachname",
        email: "E-Mail-Adresse",
        phone: "Telefonnummer",
        companyName: "Firmenname",
        vatNumber: "Umsatzsteuer-ID",
        UBO: "Handelsregisternummer",
        street: "Straße",
        city: "Stadt",
        postalCode: "Postleitzahl",
        country: "Land",
        selectCountry: "Land auswählen",
        password: "Passwort",
        confirmPassword: "Passwort bestätigen",
         shareholdersInfo: "Shareholders Information",
      shareholdersInfoDesc: "Please provide details of all shareholders and upload identification documents",
      shareholder: "Shareholder",
      shareholderFullName: "Full Name",
      shareholderIdUpload: "Identification Document",
      enterFullName: "Enter full name",
      uploadFile: "Upload a file",
      dragAndDrop: "or drag and drop",
      fileTypes: "PNG, JPG, PDF up to 10MB",
      addAnotherShareholder: "Add Another Shareholder",
      removeLastShareholder: "Remove Last",
        acceptTerms: "Ich akzeptiere die",
        termsAndConditions: "Allgemeinen Geschäftsbedingungen",
        acceptPrivacy: "Ich akzeptiere die",
        privacyPolicy: "Datenschutzrichtlinie",
        acceptMarketing: "Ich möchte Marketingmitteilungen erhalten",
        createAccount: "Konto erstellen",
        alreadyHaveAccount: "Bereits ein Konto?",
        loginHere: "Hier anmelden",
        step1: "Persönlich",
        step1Desc: "Über Sie",
        step2: "Geschäft",
        step2Desc: "Ihr Unternehmen",
        step3: "Adresse",
        step3Desc: "Standort",
        step4: "Sicherheit",
        step5: "Aandeelhouders",
        step4Desc: "Passwort",
        errors: {
          firstNameRequired: "Vorname ist erforderlich",
          lastNameRequired: "Nachname ist erforderlich",
          emailRequired: "E-Mail ist erforderlich",
          emailInvalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
          phoneRequired: "Telefonnummer ist erforderlich",
          companyNameRequired: "Firmenname ist erforderlich",
          vatNumberRequired: "Umsatzsteuer-ID ist erforderlich",
          UBORequired: "Handelsregisternummer ist erforderlich",
          streetRequired: "Straße ist erforderlich",
          cityRequired: "Stadt ist erforderlich",
          postalCodeRequired: "Postleitzahl ist erforderlich",
          countryRequired: "Land ist erforderlich",
          passwordRequired: "Passwort ist erforderlich",
          passwordTooShort: "Passwort muss mindestens 8 Zeichen haben",
          confirmPasswordRequired: "Bitte bestätigen Sie Ihr Passwort",
          passwordsDoNotMatch: "Passwörter stimmen nicht überein",
          termsRequired: "Sie müssen die Allgemeinen Geschäftsbedingungen akzeptieren",
          privacyRequired: "Sie müssen die Datenschutzrichtlinie akzeptieren",
          registrationFailed: "Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.",
          shareholderNameRequired: "Name des Aktionärs ist erforderlich",
          shareholderIdRequired: "Ausweis des Aktionärs ist erforderlich"
        }
      }
    }
  },
  nl: {
    languageName: "Nederlands",
    // Header
    header: {
      mainMenu: {
        home: "Home",
        buyCars: "Auto's kopen",
        sellCars: "Auto's verkopen",
        aboutUs: "Over ons",
        contact: "Contact",
        help: "Hulp"
      },
      buyMenu: {
        browseInventory: "Voorraad bekijken",
        directBuy: "Direct kopen",
        auctions: "Veilingen"
      },
      sellMenu: {
        sellYourCar: "Uw auto verkopen",
        pricingGuide: "Prijsgids",
        evaApp: "EVA App"
      },
      userMenu: {
        dashboard: "Dashboard",
        profile: "Profiel"
      },
      language: "Taal",
      welcome: "Welkom"
    },
    navigation: {
      buyCars: "Auto's kopen",
      sellCars: "Auto's verkopen",
      company: "Bedrijf",
      aboutUs: "Over ons",
      jobs: "Vacatures",
      dataPrivacy: "Privacy",
      termsConditions: "Voorwaarden",
      imprint: "Colofon",
      newsPress: "Nieuws & pers",
      login: "Inloggen",
      signup: "Registreren"
    },
    // Hero Section
    hero: {
      title: "Europa's grootste groothandelsplatform voor gebruikte auto's",
      buySection: {
        title: "Auto's kopen",
        points: [
          "Dagelijks 3.000+ nieuwe auto's",
          "30.000+ auto's op voorraad",
          "Betrouwbare documentatie van autostaat"
        ],
        cta: "Begin met kopen"
      },
      sellSection: {
        title: "Auto's verkopen",
        points: [
          "Verkoop binnen 24 uur voor de hoogste prijzen",
          "Volledige transport- en documentafhandeling",
          "60.000+ dealers bieden op uw auto"
        ],
        cta: "Begin met verkopen"
      }
    },
    // Success Stories
    successStories: {
      title: "Succesverhalen",
      subtitle: "Ontdek hoe dealers zoals u hun bedrijf laten groeien met CarNetwork",
      stories: [
        {
          name: "Sarah Mitchell",
          description: "Omzet met 150% gestegen in 6 maanden"
        },
        {
          name: "James Wilson",
          description: "Dealeractiviteiten gemoderniseerd"
        },
        {
          name: "Emily Rodriguez",
          description: "Uitgebreid naar 3 nieuwe locaties"
        },
        {
          name: "Michael Chang",
          description: "Klanttevredenheid verdubbeld"
        },
        {
          name: "Lisa Thompson",
          description: "Online verkoopproces gerevolutioneerd"
        },
        {
          name: "David Parker",
          description: "Recordbrekende groei behaald"
        },
        {
          name: "Amanda Foster",
          description: "Leidend in digitale transformatie"
        },
        {
          name: "Robert Chen",
          description: "Pionier in elektrische autoverkoop"
        }
      ]
    },
    // Daily Cars Section
    dailyCars: {
      title: "Meer dan 3.000 auto's dagelijks toegevoegd",
      activeStatus: "Actief",
      addedToday: "Vandaag toegevoegd"
    },
    // Business Growth Section
    businessGrowth: {
      title: "Groei uw bedrijf met CarNetwork",
      description: "CarNetwork is Europa's grootste groothandelsplatform voor gebruikte auto's. We ondersteunen uw bedrijfsgroei met digitale koop- en verkoopoplossingen, eersteklas transportoplossingen en toegewijde accountmanagers.",
      learnMore: "Meer informatie",
      contactUs: "Contact",
      watchStory: "Bekijk ons verhaal"
    },
    // Common
    common: {
      loading: "Laden...",
      error: "Er is iets misgegaan",
      tryAgain: "Opnieuw proberen",
      startBuying: "Begin met kopen",
      startSelling: "Begin met verkopen",
      googlePlay: "Google Play",
      appStore: "App Store"
    },
    // Info Sections
    info: {
      business: {
        title: "Groei uw bedrijf met CarNetwork",
        description: "CarNetwork.com is Europa's grootste groothandelsplatform voor gebruikte auto's. We ondersteunen uw bedrijfsgroei met digitale koop- en verkoopoplossingen, eersteklas Europese transportoplossingen en toegewijde accountmanagers.",
        stats: {
          partners: "Partners",
          inventory: "Auto's op voorraad",
          daily: "Dagelijks toegevoegd"
        }
      },
      buying: {
        title: "Auto's kopen met CarNetwork",
        description: "Krijg toegang tot een Europese voorraad en kies uit meer dan 30.000 auto's op voorraad en 3.000 nieuwe auto's dagelijks! Koop auto's snel en gemakkelijk volledig online en zonder tijdrovende fysieke veilingen, minimale afnamehoeveelheden of verborgen kosten."
      },
      selling: {
        title: "Auto's verkopen met CarNetwork",
        description: "Verkoop auto's die niet in uw portfolio passen eenvoudig en volledig online aan 60.000 dealers. Behaal de hoogste prijzen en digitaliseer uw inruil met de CarNetwork EVA app."
      }
    },
    // Authentication
    profile: {
      personalInfo: "Persoonlijke informatie",
      businessInfo: "Bedrijfsinformatie",
      addressInfo: "Adresgegevens",
      accountSettings: "Account instellingen",
      accountStatus: "Account status",
      editProfile: "Profiel bewerken",
      changePassword: "Wachtwoord wijzigen",
      memberSince: "Lid sinds",
      accountType: "Account type",
      dealer: "Dealer",
      verificationStatus: "Verificatiestatus",
      verified: "Geverifieerd",
      notVerified: "Niet geverifieerd",
       save:"Opslaan",
      cancel:"Annuleren",
      currentPassword:"Huidig wachtwoord",
      newPassword:"Nieuw wachtwoord",
      confirmPassword:"Bevestig wachtwoord",
      logout: "Uitloggen",
      error: "Fout",
      retry: "Opnieuw proberen",
      saving: "Opslaan...",
      updateError: "Bijwerken mislukt. Probeer het opnieuw.",
      passwordChangeSuccess: "Wachtwoord succesvol gewijzigd.",
      errors: {
        currentPasswordRequired: "Huidig wachtwoord is verplicht.",
        newPasswordRequired: "Nieuw wachtwoord is verplicht.",
        confirmPasswordRequired: "Bevestig wachtwoord is verplicht.",
        passwordsDontMatch: "Wachtwoorden komen niet overeen.",
        passwordTooShort: "Wachtwoord moet minimaal 8 tekens lang zijn."
      }

    },
    auth: {
      login: {
        title: "Welkom terug",
        subtitle: "Log in op uw account",
        email: "E-mailadres",
        password: "Wachtwoord",
        rememberMe: "Onthoud mij",
        forgotPassword: "Wachtwoord vergeten?",
        signIn: "Inloggen",
        noAccount: "Nog geen account?",
        createAccount: "Account aanmaken",
        errors: {
          invalidCredentials: "Ongeldig e-mailadres of wachtwoord",
          required: "Dit veld is verplicht",
          invalidEmail: "Voer een geldig e-mailadres in"
        }
      },
      register: {
        title: "Maak uw account aan",
        subtitle: "Word lid van Europa's grootste automarktplaats",
        step1: "Persoonlijke informatie",
        step2: "Bedrijfsinformatie",
        step3: "Adresgegevens",
        step4: "Accountbeveiliging",
        step5: "Aandeelhouders",
        personalInfo: "Persoonlijke informatie",
        personalInfoDesc: "Vertel ons iets over uzelf",
        businessInfo: "Bedrijfsinformatie",
        businessInfoDesc: "Vertel ons iets over uw bedrijf",
        addressInfo: "Adresgegevens",
        addressInfoDesc: "Waar bent u gevestigd?",
         shareholdersInfo: "Shareholders Information",
      shareholdersInfoDesc: "Please provide details of all shareholders and upload identification documents",
      shareholder: "Shareholder",
      shareholderFullName: "Full Name",
      shareholderIdUpload: "Identification Document",
      enterFullName: "Enter full name",
      uploadFile: "Upload a file",
      dragAndDrop: "or drag and drop",
      fileTypes: "PNG, JPG, PDF up to 10MB",
      addAnotherShareholder: "Add Another Shareholder",
      removeLastShareholder: "Remove Last",
        accountSecurity: "Accountbeveiliging",
        accountSecurityDesc: "Maak een veilig wachtwoord",
        firstName: "Voornaam",
        lastName: "Achternaam",
        email: "E-mailadres",
        phone: "Telefoonnummer",
        companyName: "Bedrijfsnaam",
        vatNumber: "BTW-nummer",
        UBO: "KvK-nummer",
        street: "Straat",
        city: "Stad",
        postalCode: "Postcode",
        country: "Land",
        selectCountry: "Selecteer een land",
        password: "Wachtwoord",
        confirmPassword: "Wachtwoord bevestigen",
        acceptTerms: "Ik accepteer de",
        termsAndConditions: "algemene voorwaarden",
        acceptPrivacy: "Ik accepteer het",
        privacyPolicy: "privacybeleid",
        acceptMarketing: "Ik wil marketingcommunicatie ontvangen",
        createAccount: "Account aanmaken",
        alreadyHaveAccount: "Heeft u al een account?",
        loginHere: "Hier inloggen",
        step1: "Persoonlijk",
        step1Desc: "Over u",
        step2: "Bedrijf",
        step2Desc: "Uw bedrijf",
        step3: "Adres",
        step3Desc: "Locatie",
        step4: "Beveiliging",
        step5:"Aandeelhouders",
        step4Desc: "Wachtwoord",
        errors: {
          firstNameRequired: "Voornaam is verplicht",
          lastNameRequired: "Achternaam is verplicht",
          emailRequired: "E-mailadres is verplicht",
          emailInvalid: "Voer een geldig e-mailadres in",
          phoneRequired: "Telefoonnummer is verplicht",
          companyNameRequired: "Bedrijfsnaam is verplicht",
          vatNumberRequired: "BTW-nummer is verplicht",
          UBORequired: "KvK-nummer is verplicht",
          streetRequired: "Straat is verplicht",
          cityRequired: "Stad is verplicht",
          postalCodeRequired: "Postcode is verplicht",
          countryRequired: "Land is verplicht",
          passwordRequired: "Wachtwoord is verplicht",
          passwordTooShort: "Wachtwoord moet minimaal 8 tekens bevatten",
          confirmPasswordRequired: "Bevestig uw wachtwoord",
          passwordsDoNotMatch: "Wachtwoorden komen niet overeen",
          termsRequired: "U moet de algemene voorwaarden accepteren",
          privacyRequired: "U moet het privacybeleid accepteren",
          registrationFailed: "Registratie mislukt. Probeer het opnieuw.",
          shareholderNameRequired: "Naam van de aandeelhouder is verplicht",
          shareholderIdRequired: "Identiteitsbewijs van de aandeelhouder is verplicht"
        }
      }
    }
  }
};