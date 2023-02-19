// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const springUrl = "http://localhost:9090/";
export const tomcatUrl = "http://localhost:8200/";

export const roleResponsableStructure = [{
  "id": "ae0d7859-0f17-4bcd-9663-5dd9146695ec",
  "name": "ROLE_RESPONSABLE_STRUCTURE"
}]
export const roleProf = [{
  "id": "7abeb814-9bc8-4037-a91e-7fbd3e4f7043",
  "name": "ROLE_PROF"
}]

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
