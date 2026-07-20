export type RegisterUser = {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
};

export function createRegisterUser(overrides: Partial<RegisterUser> = {}): RegisterUser {
  const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  return {
    name: `AE Test ${id}`,
    email: `ae.test.${id}@example.com`,
    password: `Password${id}!`,
    firstName: "Automation",
    lastName: "Tester",
    company: "ODDS",
    address: "123 Test Street",
    address2: "Suite 45",
    country: "United States",
    state: "California",
    city: "San Francisco",
    zipcode: "94105",
    mobileNumber: "0812345678",
    birthDay: "10",
    birthMonth: "5",
    birthYear: "1990",
    ...overrides,
  };
}

