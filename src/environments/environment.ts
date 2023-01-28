// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  KEY_LOCAL_STORAGE_PARTICIPANTS: 'participantsJson',
  KEY_LOCAL_STORAGE_WINNERS: 'winnersJson',
  KEY_LOCAL_STORAGE_MODE: 'mode',
  PARTICIPANTS_MOCK_URL: '/assets/data/participants.json',
  WINNERS_MOCK_URL: '/assets/data/winners.json',
  TOUR_MODE: 'TOUR',
  DEMO_MODE: 'DEMO',
  PROD_MODE: 'PROD',
  NAME_FIELD_REGULAR_EXPRESSION: '^[^.]+$',
  SERVER_URL: 'http://localhost:4200',
  WHEEL_TEXT_FONT_SIZE: 16
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
