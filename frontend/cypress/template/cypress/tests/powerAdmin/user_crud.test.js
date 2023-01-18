import { autoRegisterLogin, checkForErrorMessage } from './lib/_util'
import { setupUserForm, findFirstUser } from './lib/_user_lib'

describe('User CRUD [1]', () => {
  it('change the first admin user', () => {
    autoRegisterLogin();
    var testData =
    {
      userName: "master",
      userEmail: "x",
      phone_mask: "51995152432",
      user_type: "Type O-",
      expectedError: "INVALID_EMAIL"
    };
    findFirstUser();
    setupUserForm(testData.phone_mask, testData.user_type, testData.userName, testData.userEmail);
    checkForErrorMessage(testData.expectedError)
  })
})

describe('User CRUD [2]', () => {
  it('change the first admin user', () => {
    autoRegisterLogin();
    var testData =
    {
      userName: " ",
      userEmail: "valid@email.com",
      phone_mask: "51995152432",
      user_type: "Type O-",
      expectedError: "NAME_MANDATORY"
    };
    findFirstUser();
    setupUserForm(testData.phone_mask, testData.user_type, testData.userName, testData.userEmail);
    checkForErrorMessage(testData.expectedError)
  })
})

describe('User CRUD [3]', () => {
  it('change the first admin user', () => {
    autoRegisterLogin();
    var testData =
    {
      userName: "h",
      userEmail: "@ssss.com",
      phone_mask: "51995152432",
      user_type: "Type O-",
      expectedError: "INVALID_EMAIL"
    };
    findFirstUser();
    setupUserForm(testData.phone_mask, testData.user_type, testData.userName, testData.userEmail);
    checkForErrorMessage(testData.expectedError)
  })
})

describe('User CRUD [4]', () => {
  it('change the first admin user', () => {
    autoRegisterLogin();
    var testData =
    {
      userName: "master",
      userEmail: "master@master.com",
      phone_mask: "541554",
      user_type: "xxxx",
      expectedError: "INVALID_PHONE"
    };
    findFirstUser();
    setupUserForm(testData.phone_mask, testData.user_type, testData.userName, testData.userEmail);
    checkForErrorMessage(testData.expectedError)
  })
})

describe('User CRUD [5]', () => {
  it('change the first admin user', () => {
    autoRegisterLogin();
    var testData =
    {
      userName: "master",
      userEmail: "master@master.com",
      phone_mask: "xxxxxx",
      user_type: "xxxx",
      expectedError: "INVALID_PHONE"
    };
    findFirstUser();
    setupUserForm(testData.phone_mask, testData.user_type, testData.userName, testData.userEmail);
    checkForErrorMessage(testData.expectedError)
  })
})
