import { faker } from '@faker-js/faker'

export const users = [
  {
    id: faker.string.uuid(),
    email: "john.doe@example.com",
    firstName: "Chihéb",
    lastName: "Rinéz",
    gender: "male",
    birthday: new Date("1990-01-01"),
    location: "New York, USA",
    phone: "123-456-7890",
    problem: "No problems reported",
    role: "student",
    status:"active",
    passwordChangedAt: new Date(),
    passwordResetCode: null,
    passwordResetExpires: null,
    passwordResetVerified: false,
  },
  {
    id: faker.string.uuid(),
    email: "jane.smith@example.com",
    firstName: "Majd",
    lastName: "Lefi",
    gender: "female",
    birthday: new Date("1985-05-15"),
    location: "Los Angeles, USA",
    phone: "098-765-4321",
    problem: "No problems reported",
    role: "admin",
    status:"active",
    passwordChangedAt: new Date(),
    passwordResetCode: null,
    passwordResetExpires: null,
    passwordResetVerified: false,
  },
  {
    id: faker.string.uuid(),
    email: "michael.jordan@example.com",
    firstName: "Michael",
    lastName: "Jordan",
    gender: "male",
    birthday: new Date("1995-07-23"),
    location: "Chicago, USA",
    phone: "555-555-5555",
    problem: "Needs assistance with registration",
    role: "parent",
    status:"banned",
    passwordChangedAt: new Date(),
    passwordResetCode: null,
    passwordResetExpires: null,
    passwordResetVerified: false,
  }
];


// import { sample } from 'lodash';
// import { faker } from '@faker-js/faker';

// // ----------------------------------------------------------------------

// export const users = [...Array(24)].map((_, index) => ({
//   id: faker.string.uuid(),
//   avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
//   name: faker.person.fullName(),
//   company: faker.company.name(),
//   isVerified: faker.datatype.boolean(),
//   status: sample(['active', 'banned']),
//   role: sample([
//     'Leader',
//     'Hr Manager',
//     'UI Designer',
//     'UX Designer',
//     'UI/UX Designer',
//     'Project Manager',
//     'Backend Developer',
//     'Full Stack Designer',
//     'Front End Developer',
//     'Full Stack Developer',
//   ]),
// }));
