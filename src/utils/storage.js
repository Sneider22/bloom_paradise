const CAMPERS_KEY = 'camp_loyaltown_campers';
const SESSION_KEY = 'camp_loyaltown_session';

const initialMockCampers = [
  {
    id: "CL-2026-01",
    name: "Michael Meneses",
    age: 24,
    representative: "Carlos Meneses",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp1",
    servicePeriod: "6/14/26-6/28/26",
    files: []
  },
  {
    id: "CL-2026-02",
    name: "Milouse Michel",
    age: 19,
    representative: "Jean Michel",
    condition: "Reincorporado",
    previousSeason: "Temporada 2025",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp1",
    servicePeriod: "6/14/26-6/28/26",
    files: []
  },
  {
    id: "CL-2026-03",
    name: "Michael Moffat",
    age: 31,
    representative: "Sarah Moffat",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Privado",
    insuranceName: "",
    paymentAmount: 797.76,
    rateCode: "OR",
    rateDescription: "Other Residences/Family Care",
    sessionNum: "Camp1",
    servicePeriod: "6/14/26-6/28/26",
    files: []
  },
  {
    id: "CL-2026-04",
    name: "John Mongelli",
    age: 28,
    representative: "Robert Mongelli",
    condition: "Reincorporado",
    previousSeason: "Temporada 2025",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp1",
    servicePeriod: "6/14/26-6/28/26",
    files: []
  },
  {
    id: "CL-2026-05",
    name: "Rohin Ochani",
    age: 15,
    representative: "Kiran Ochani",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp1",
    servicePeriod: "6/14/26-6/28/26",
    files: []
  },
  {
    id: "CL-2026-06",
    name: "Aidan Osorio",
    age: 22,
    representative: "Maria Osorio",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp1",
    servicePeriod: "6/14/26-6/28/26",
    files: []
  },
  {
    id: "CL-2026-07",
    name: "Isabel Palomino",
    age: 18,
    representative: "Juan Palomino",
    condition: "Reincorporado",
    previousSeason: "Temporada 2025",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Intensive (7425)-Behavioral",
    paymentAmount: 11.16,
    rateCode: "MW-INTB",
    rateDescription: "Medicaid Waiver Intensive (7425)-Behavioral",
    sessionNum: "Camp1",
    servicePeriod: "6/14/26-6/28/26",
    files: []
  },
  {
    id: "CL-2026-08",
    name: "Francesco Parente",
    age: 45,
    representative: "Lucia Parente",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp1",
    servicePeriod: "6/14/26-6/28/26",
    files: []
  },
  {
    id: "CL-2026-09",
    name: "Noah Probert",
    age: 13,
    representative: "David Probert",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp1",
    servicePeriod: "6/14/26-6/28/26",
    files: []
  },
  {
    id: "CL-2026-10",
    name: "Stephanie Quesquen",
    age: 29,
    representative: "Elena Quesquen",
    condition: "Reincorporado",
    previousSeason: "Temporada 2024",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp1",
    servicePeriod: "6/14/26-6/28/26",
    files: []
  },
  {
    id: "CL-2026-11",
    name: "Justin Abney",
    age: 36,
    representative: "George Abney",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp2",
    servicePeriod: "6/28/26-7/12/26",
    files: []
  },
  {
    id: "CL-2026-12",
    name: "Jasmine Arama",
    age: 17,
    representative: "Sandro Arama",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp2",
    servicePeriod: "6/28/26-7/12/26",
    files: []
  },
  {
    id: "CL-2026-13",
    name: "Michael Arata",
    age: 25,
    representative: "Nancy Arata",
    condition: "Reincorporado",
    previousSeason: "Temporada 2025",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp2",
    servicePeriod: "6/28/26-7/12/26",
    files: []
  },
  {
    id: "CL-2026-14",
    name: "Patrick Archibald",
    age: 52,
    representative: "William Archibald",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp2",
    servicePeriod: "6/28/26-7/12/26",
    files: []
  },
  {
    id: "CL-2026-15",
    name: "Robert Barbini",
    age: 41,
    representative: "Clara Barbini",
    condition: "Reincorporado",
    previousSeason: "Temporada 2025",
    paymentMethod: "Privado",
    insuranceName: "",
    paymentAmount: 797.76,
    rateCode: "OR",
    rateDescription: "Other Residences/Family Care",
    sessionNum: "Camp2",
    servicePeriod: "6/28/26-7/12/26",
    files: []
  },
  {
    id: "CL-2026-16",
    name: "Daeja Blue",
    age: 14,
    representative: "Marcus Blue",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp2",
    servicePeriod: "6/28/26-7/12/26",
    files: []
  },
  {
    id: "CL-2026-17",
    name: "Angela Bonasia",
    age: 23,
    representative: "Thomas Bonasia",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Intensive (7425)-Behavioral",
    paymentAmount: 11.16,
    rateCode: "MW-INTB",
    rateDescription: "Medicaid Waiver Intensive (7425)-Behavioral",
    sessionNum: "Camp2",
    servicePeriod: "6/28/26-7/12/26",
    files: []
  },
  {
    id: "CL-2026-18",
    name: "Jeanine Bonfiglio",
    age: 30,
    representative: "Paul Bonfiglio",
    condition: "Reincorporado",
    previousSeason: "Temporada 2025",
    paymentMethod: "Privado",
    insuranceName: "",
    paymentAmount: 797.76,
    rateCode: "OR",
    rateDescription: "Other Residences/Family Care",
    sessionNum: "Camp2",
    servicePeriod: "6/28/26-7/12/26",
    files: []
  },
  {
    id: "CL-2026-19",
    name: "Emily Brown",
    age: 27,
    representative: "Alice Brown",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp2",
    servicePeriod: "6/28/26-7/12/26",
    files: []
  },
  {
    id: "CL-2026-20",
    name: "Daniel Carroccio",
    age: 33,
    representative: "Joseph Carroccio",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp3",
    servicePeriod: "7/12/26-7/26/26",
    files: []
  },
  {
    id: "CL-2026-21",
    name: "Caroline Carter",
    age: 21,
    representative: "Susan Carter",
    condition: "Reincorporado",
    previousSeason: "Temporada 2024",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp3",
    servicePeriod: "7/12/26-7/26/26",
    files: []
  },
  {
    id: "CL-2026-22",
    name: "Howon Chung",
    age: 26,
    representative: "Min Chung",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp3",
    servicePeriod: "7/12/26-7/26/26",
    files: []
  },
  {
    id: "CL-2026-23",
    name: "Daniel Concepcion",
    age: 48,
    representative: "Victor Concepcion",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp3",
    servicePeriod: "7/12/26-7/26/26",
    files: []
  },
  {
    id: "CL-2026-24",
    name: "Rogelio Concepcion",
    age: 50,
    representative: "Victor Concepcion",
    condition: "Reincorporado",
    previousSeason: "Temporada 2025",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp3",
    servicePeriod: "7/12/26-7/26/26",
    files: []
  },
  {
    id: "CL-2026-25",
    name: "Ann Creta",
    age: 62,
    representative: "Louis Creta",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp3",
    servicePeriod: "7/12/26-7/26/26",
    files: []
  },
  {
    id: "CL-2026-26",
    name: "Sheila Cronin",
    age: 44,
    representative: "Patrick Cronin",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp3",
    servicePeriod: "7/12/26-7/26/26",
    files: []
  },
  {
    id: "CL-2026-27",
    name: "Patrick Dagrossa",
    age: 35,
    representative: "Gail Dagrossa",
    condition: "Reincorporado",
    previousSeason: "Temporada 2025",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp3",
    servicePeriod: "7/12/26-7/26/26",
    files: []
  },
  {
    id: "CL-2026-28",
    name: "Chelsea Daley",
    age: 20,
    representative: "Robert Daley",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp3",
    servicePeriod: "7/12/26-7/26/26",
    files: []
  },
  {
    id: "CL-2026-29",
    name: "Ruby Kassimir",
    age: 12,
    representative: "Jane Kassimir",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp4",
    servicePeriod: "7/26/26-8/9/26",
    files: []
  },
  {
    id: "CL-2026-30",
    name: "Christopher Kirgan",
    age: 29,
    representative: "Marie Kirgan",
    condition: "Reincorporado",
    previousSeason: "Temporada 2025",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp4",
    servicePeriod: "7/26/26-8/9/26",
    files: []
  },
  {
    id: "CL-2026-31",
    name: "Christopher Koprowski",
    age: 31,
    representative: "John Koprowski",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp4",
    servicePeriod: "7/26/26-8/9/26",
    files: []
  },
  {
    id: "CL-2026-32",
    name: "Brian Lee",
    age: 40,
    representative: "Susan Lee",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp4",
    servicePeriod: "7/26/26-8/9/26",
    files: []
  },
  {
    id: "CL-2026-33",
    name: "Alexander Mandell",
    age: 16,
    representative: "Richard Mandell",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Privado",
    insuranceName: "",
    paymentAmount: 797.76,
    rateCode: "OR",
    rateDescription: "Other Residences/Family Care",
    sessionNum: "Camp4",
    servicePeriod: "7/26/26-8/9/26",
    files: []
  },
  {
    id: "CL-2026-34",
    name: "Nicolas Mandell",
    age: 18,
    representative: "Richard Mandell",
    condition: "Reincorporado",
    previousSeason: "Temporada 2025",
    paymentMethod: "Privado",
    insuranceName: "",
    paymentAmount: 797.76,
    rateCode: "OR",
    rateDescription: "Other Residences/Family Care",
    sessionNum: "Camp4",
    servicePeriod: "7/26/26-8/9/26",
    files: []
  },
  {
    id: "CL-2026-35",
    name: "Michelle Miraglia",
    age: 22,
    representative: "Helen Miraglia",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp4",
    servicePeriod: "7/26/26-8/9/26",
    files: []
  },
  {
    id: "CL-2026-36",
    name: "Michael Moffat",
    age: 31,
    representative: "Sarah Moffat",
    condition: "Reincorporado",
    previousSeason: "Temporada 2025",
    paymentMethod: "Privado",
    insuranceName: "",
    paymentAmount: 797.76,
    rateCode: "OR",
    rateDescription: "Other Residences/Family Care",
    sessionNum: "Camp4",
    servicePeriod: "7/26/26-8/9/26",
    files: []
  },
  {
    id: "CL-2026-37",
    name: "Khaldane Morgan",
    age: 38,
    representative: "Trevor Morgan",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp4",
    servicePeriod: "7/26/26-8/9/26",
    files: []
  },
  {
    id: "CL-2026-38",
    name: "Benjamin Naftali",
    age: 27,
    representative: "Debra Naftali",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp4",
    servicePeriod: "7/26/26-8/9/26",
    files: []
  },
  {
    id: "CL-2026-39",
    name: "Stephen Smith",
    age: 49,
    representative: "Karen Smith",
    condition: "Reincorporado",
    previousSeason: "Temporada 2025",
    paymentMethod: "Seguro",
    insuranceName: "Nassau County Residents Living at Home",
    paymentAmount: 175.00,
    rateCode: "NCD-350",
    rateDescription: "Nassau County Residents Living at Home",
    sessionNum: "Camp3",
    servicePeriod: "7/12/26-7/26/26",
    files: []
  },
  {
    id: "CL-2026-40",
    name: "Laura Tantillo",
    age: 58,
    representative: "Peter Tantillo",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Nassau County Residents Living at Home",
    paymentAmount: 250.00,
    rateCode: "NCD-350",
    rateDescription: "Nassau County Residents Living at Home",
    sessionNum: "Camp3",
    servicePeriod: "7/12/26-7/26/26",
    files: []
  },
  {
    id: "CL-2026-41",
    name: "Aaron Birnbaun",
    age: 32,
    representative: "Helen Birnbaun",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp4",
    servicePeriod: "7/26/26-8/9/26",
    files: []
  },
  {
    id: "CL-2026-42",
    name: "Daniel Cardone",
    age: 47,
    representative: "Frank Cardone",
    condition: "Reincorporado",
    previousSeason: "Temporada 2025",
    paymentMethod: "Privado",
    insuranceName: "",
    paymentAmount: 797.76,
    rateCode: "OR",
    rateDescription: "Other Residences/Family Care",
    sessionNum: "Camp4",
    servicePeriod: "7/26/26-8/9/26",
    files: []
  },
  {
    id: "CL-2026-43",
    name: "Michael Dolgov",
    age: 34,
    representative: "Elena Dolgov",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp4",
    servicePeriod: "7/26/26-8/9/26",
    files: []
  },
  {
    id: "CL-2026-44",
    name: "Delaney Conlon",
    age: 28,
    representative: "Jane Conlon",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp4",
    servicePeriod: "7/26/26-8/9/26",
    files: []
  },
  {
    id: "CL-2026-45",
    name: "Alexa Gorman",
    age: 19,
    representative: "Richard Gorman",
    condition: "Reincorporado",
    previousSeason: "Temporada 2025",
    paymentMethod: "Seguro",
    insuranceName: "Nassau County Residents Living at Home",
    paymentAmount: 175.00,
    rateCode: "NCD-350",
    rateDescription: "Nassau County Residents Living at Home",
    sessionNum: "Camp4",
    servicePeriod: "7/26/26-8/9/26",
    files: []
  },
  {
    id: "CL-2026-46",
    name: "James Gilmour",
    age: 21,
    representative: "Thomas Gilmour",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Medicaid Waiver Summer (7424)",
    paymentAmount: 8.31,
    rateCode: "MW-Summer",
    rateDescription: "Medicaid Waiver Summer (7424)",
    sessionNum: "Camp4",
    servicePeriod: "7/26/26-8/9/26",
    files: []
  },
  {
    id: "CL-2026-47",
    name: "Anna Kaplowitz",
    age: 30,
    representative: "Mark Kaplowitz",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Nassau County Residents Living at Home",
    paymentAmount: 175.00,
    rateCode: "NCD-350",
    rateDescription: "Nassau County Residents Living at Home",
    sessionNum: "Camp4",
    servicePeriod: "7/26/26-8/9/26",
    files: []
  },
  {
    id: "CL-2026-48",
    name: "John Mazzella",
    age: 55,
    representative: "Rose Mazzella",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Nassau County Residents Living at Home",
    paymentAmount: 175.00,
    rateCode: "NCD-350",
    rateDescription: "Nassau County Residents Living at Home",
    sessionNum: "Camp4",
    servicePeriod: "7/26/26-8/9/26",
    files: []
  },
  {
    id: "CL-2026-49",
    name: "Christopher Mirino",
    age: 43,
    representative: "Diane Mirino",
    condition: "Nuevo",
    previousSeason: "",
    paymentMethod: "Seguro",
    insuranceName: "Nassau County Residents Living at Home",
    paymentAmount: 175.00,
    rateCode: "NCD-350",
    rateDescription: "Nassau County Residents Living at Home",
    sessionNum: "Camp4",
    servicePeriod: "7/26/26-8/9/26",
    files: []
  },
  {
    id: "CL-2026-50",
    name: "John Mazzella",
    age: 55,
    representative: "Rose Mazzella",
    condition: "Reincorporado",
    previousSeason: "Temporada 2025",
    paymentMethod: "Seguro",
    insuranceName: "Nassau County Residents Living at Home",
    paymentAmount: 175.00,
    rateCode: "NCD-350",
    rateDescription: "Nassau County Residents Living at Home",
    sessionNum: "Camp5",
    servicePeriod: "8/9/26-8/23/26",
    files: []
  },
  {
    id: "CL-2026-51",
    name: "Christopher Mirino",
    age: 43,
    representative: "Diane Mirino",
    condition: "Reincorporado",
    previousSeason: "Temporada 2025",
    paymentMethod: "Seguro",
    insuranceName: "Nassau County Residents Living at Home",
    paymentAmount: 175.00,
    rateCode: "NCD-350",
    rateDescription: "Nassau County Residents Living at Home",
    sessionNum: "Camp5",
    servicePeriod: "8/9/26-8/23/26",
    files: []
  }
];


export const storage = {
  // --- Camper Management ---
  getCampers: () => {
    try {
      const data = localStorage.getItem(CAMPERS_KEY);
      if (!data) {
        // Seed initial data
        localStorage.setItem(CAMPERS_KEY, JSON.stringify(initialMockCampers));
        return initialMockCampers;
      }
      const parsed = JSON.parse(data);
      // Auto-update check: if the schema is old (does not contain rateCode), re-seed
      if (parsed.length > 0 && !parsed[0].hasOwnProperty('rateCode')) {
        localStorage.setItem(CAMPERS_KEY, JSON.stringify(initialMockCampers));
        return initialMockCampers;
      }
      return parsed;
    } catch (e) {
      console.error("Error reading campers from localStorage", e);
      return [];
    }
  },

  saveCampers: (campers) => {
    try {
      localStorage.setItem(CAMPERS_KEY, JSON.stringify(campers));
    } catch (e) {
      console.error("Error saving campers to localStorage", e);
    }
  },

  addCamper: (camper) => {
    const campers = storage.getCampers();
    if (campers.some(c => c.id.toLowerCase() === camper.id.toLowerCase())) {
      throw new Error(`El código o ID único "${camper.id}" ya está registrado.`);
    }
    const updated = [...campers, { ...camper, files: camper.files || [] }];
    storage.saveCampers(updated);
    return updated;
  },

  updateCamper: (updatedCamper) => {
    const campers = storage.getCampers();
    const updated = campers.map(c => c.id === updatedCamper.id ? updatedCamper : c);
    storage.saveCampers(updated);
    return updated;
  },

  deleteCamper: (id) => {
    const campers = storage.getCampers();
    const updated = campers.filter(c => c.id !== id);
    storage.saveCampers(updated);
    return updated;
  },

  // --- Session Management ---
  getSession: () => {
    try {
      const session = localStorage.getItem(SESSION_KEY);
      return session ? JSON.parse(session) : null;
    } catch (e) {
      console.error("Error reading session from localStorage", e);
      return null;
    }
  },

  saveSession: (username) => {
    try {
      const sessionData = { username, loginTime: new Date().toISOString() };
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
      return sessionData;
    } catch (e) {
      console.error("Error saving session to localStorage", e);
      return null;
    }
  },

  clearSession: () => {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (e) {
      console.error("Error clearing session from localStorage", e);
    }
  }
};
