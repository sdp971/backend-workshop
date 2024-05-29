import { faker } from '@faker-js/faker';

function createRandomAuthor(numberAuthors) {
  const authors = [];
 

  for (let i = 0; i < numberAuthors; i++) {
    authors.push({
      name: faker.person.fullName(),
    });
  }
  return authors;
}

function createRandomEditor(numberEditors) {
  const editors = [];


  for (let i = 0; i < numberEditors; i++) {
    editors.push({
      name: faker.person.fullName(),
    });
  }
  return editors;
}

function createRandomUser(numberUsers) {
  console.log('youhou');

  const users = [];

  for (let i = 0; i < numberUsers; i++) {
    const randomUser = {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      age: faker.number.int({ min: 17, max: 100 }),
      phone_number: faker.phone.number(),
    };
    console.log(randomUser, 'inside random');
    users.push(randomUser);
  }

  return users;
}

function createRandomLoan(numberLoans, randomUser) {
  const loans = [];

  for (let i = 0; i < numberLoans; i++) {
    const randomUserIndex = Math.floor(Math.random() * randomUser.length) + 1;
    console.log(randomUserIndex, 'index');
    const randomLoan = {
      date_start: faker.date.past(),
      date_end: faker.date.future(),
      date_returned: faker.date.between({
        from: this.date_start,
        to: this.date_end,
      }),
      user_id: randomUserIndex,
    };

    loans.push(randomLoan);
  }
  console.log(loans, 'loans');
  return loans;
}

export {
  createRandomLoan,
  createRandomAuthor,
  createRandomEditor,
  createRandomUser,
};
